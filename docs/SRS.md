# Software Requirements Specification (SRS)
## Revlient Realty — WhatsApp Sales Agent & Admin Console

**Version:** 1.0
**Date:** 23 June 2026
**Project owner:** Revlient Intercontinental LLP
**Document status:** Draft for stakeholder review

---

## 1. Introduction

### 1.1 Purpose
This document defines the functional and non-functional requirements of the **Revlient WhatsApp Sales Agent** — an autonomous, AI-driven sales consultant that engages real-estate leads on WhatsApp 24/7, and the **Admin Console** the agency uses to manage properties, monitor conversations, and intervene when needed.

### 1.2 Scope
The system replaces the cost and 24/7-availability problem of a human-only sales team for the **top-of-funnel** customer journey (first contact → qualification → photo-sharing → site-visit booking). Human staff take over only for high-value or stuck conversations.

The system handles:
- Inbound text and voice messages on WhatsApp
- AI-generated sales replies with property recommendations
- Property photo delivery on demand
- Automatic time-based follow-ups for inactive leads
- Admin takeover and manual reply
- A read-write admin dashboard for properties and conversations

### 1.3 Definitions
| Term | Meaning |
|---|---|
| **Aleena** | The AI sales persona used by the bot. |
| **Lead** | A WhatsApp user who has messaged the business number. |
| **Service window** | Meta's 24-hour period after a customer's last message during which business replies are free. |
| **Template message** | A pre-approved marketing/utility message Meta requires for business-initiated chats outside the service window. |
| **BSP** | Business Solutions Provider (e.g., AiSensy, Gupshup) — middleware between the business and Meta WhatsApp Cloud API. |
| **Cloud API** | Meta's direct WhatsApp Business Cloud API (no BSP markup). |

### 1.4 References
- Meta WhatsApp Business Platform documentation
- Supabase Postgres + Storage docs
- Groq API documentation (LLM provider)
- Next.js 16 App Router docs (deployment platform)

---

## 2. Overall Description

### 2.1 Product perspective
A cloud-native web application:
- **Frontend:** Next.js 16 (App Router) hosted on Vercel
- **Database & storage:** Supabase (Postgres + Object Storage)
- **AI:** Groq Cloud (`openai/gpt-oss-20b`) + Groq Whisper (audio transcription)
- **Messaging:** Meta WhatsApp Business Cloud API (direct, no BSP)
- **Scheduler:** Vercel Cron Jobs

### 2.2 Product functions (high-level)
1. **Inbound message handling** — receive and reply to customer messages on WhatsApp 24/7.
2. **Property catalog management** — admin can create, edit, delete properties and upload photos.
3. **Photo delivery** — bot sends relevant property photos when the customer asks.
4. **Conversational sales** — bot qualifies, recommends, handles objections, books site visits.
5. **Auto follow-up** — bot re-engages inactive leads at 22 hours since their last message (inside the free window).
6. **Admin takeover** — agency staff can pause the bot per-lead and reply manually from the dashboard.
7. **Live monitoring** — agency views all conversations in real-time, with bot/admin/follow-up distinction.

### 2.3 User classes
| User class | Description | Access |
|---|---|---|
| **End customer** | Lead messaging the WhatsApp business number. | WhatsApp only. No login. |
| **Agency admin** | Sales staff / agency owner. | `/dashboard` — password-gated. |
| **System (cron)** | Scheduled jobs. | Internal, key-authenticated. |

### 2.4 Operating environment
- **Backend runtime:** Node.js (Vercel serverless functions)
- **Database:** Postgres 15+ (Supabase managed)
- **Client browsers:** Chrome / Safari / Firefox (latest)
- **Mobile dashboard support:** Responsive down to 360px

### 2.5 Constraints
- **C1.** All Supabase access via service-role key must remain server-side. The browser must never receive any database credential.
- **C2.** No new npm dependencies beyond what is already in `package.json` (project policy).
- **C3.** Meta WhatsApp Business Cloud API rate limits and approval gates apply (see §4.4).
- **C4.** Cost-aware: business-initiated messaging outside the 24h window incurs per-message charges; the system must minimise such sends.

### 2.6 Assumptions
- The agency owns a Meta Business Account (verified or in process of verification).
- A dedicated phone number is available for WhatsApp Business (see §6).
- The agency will provide property images at sufficient quality (≥1MP).
- The agency's expected lead volume is **1,000–2,000 unique leads per month**, with peaks of ~100 active conversations/day.

---

## 3. Functional Requirements

### 3.1 Lead conversation (Bot)

| ID | Requirement |
|---|---|
| **FR-1.1** | The system shall receive inbound WhatsApp messages via a Meta webhook endpoint. |
| **FR-1.2** | The system shall handle **text** and **voice** messages. Voice messages shall be transcribed via Groq Whisper before processing. |
| **FR-1.3** | The system shall load the current property catalog and the last 10 turns of conversation history for the sender before generating a reply. |
| **FR-1.4** | The bot persona ("Aleena") shall reply in a warm, conversational sales style of 1–3 short sentences with a clear next step (site visit / call). |
| **FR-1.5** | The bot shall qualify each lead naturally (budget / location / type / timeline / intent) without re-asking known facts. |
| **FR-1.6** | The bot shall recommend matches only from the live property catalog. It shall not invent listings. |
| **FR-1.7** | The bot shall handle common objections ("too expensive", "just looking", "need to think") with empathy + a soft CTA. |
| **FR-1.8** | The bot shall persist each turn (user + assistant) to the conversation history. |
| **FR-1.9** | The bot shall refuse off-topic, code-generation, or prompt-injection requests. |
| **FR-1.10** | The bot's response time shall be ≤ 8 seconds from inbound to outbound for ≥ 95% of messages. |

### 3.2 Property photo delivery

| ID | Requirement |
|---|---|
| **FR-2.1** | When the lead asks for photos of a specific property, the bot shall send up to **3 images** of that property via the WhatsApp Cloud API. |
| **FR-2.2** | The first image shall carry a caption of `Title — Price`. |
| **FR-2.3** | If no images are available for that property, the bot shall send only the text reply (no error to the lead). |
| **FR-2.4** | Photos shall be sent **before** the text reply for natural reading order. |
| **FR-2.5** | Images shall be served from a public, CDN-backed Supabase Storage bucket. |

### 3.3 Auto follow-up

| ID | Requirement |
|---|---|
| **FR-3.1** | A scheduled job shall run **hourly**. |
| **FR-3.2** | For each lead whose last inbound message was 22–24 hours ago, with `followup_stage = 0` and `bot_paused = false`, the system shall send **one** personalised follow-up message. |
| **FR-3.3** | The follow-up shall be LLM-generated using the full chat history, shall reference the lead's last topic of interest, and shall end with a soft CTA. |
| **FR-3.4** | The follow-up shall include property photos when contextually appropriate. |
| **FR-3.5** | The follow-up shall be sent **inside** the 24h service window (zero cost). |
| **FR-3.6** | The system shall update `followup_stage = 1` and `last_followup_at = now()` after each successful follow-up. |
| **FR-3.7** | When a lead replies, `followup_stage` shall reset to 0, restarting eligibility. |
| **FR-3.8** | *(v2, requires Meta template approval)* The system shall send a Day-3 marketing template if no reply is received after the first follow-up. |
| **FR-3.9** | *(v2)* The system shall send a Day-7 marketing template as the final touch. After that, the lead is considered cold. |

### 3.4 Admin takeover & manual reply

| ID | Requirement |
|---|---|
| **FR-4.1** | The dashboard shall provide a **"Take over"** toggle per conversation. |
| **FR-4.2** | When `bot_paused = true`, the bot shall record inbound messages but not generate replies for that lead. |
| **FR-4.3** | The dashboard shall include a message composer on each thread. Sending a message shall: (a) deliver it via the Cloud API, (b) append it to history with `by = "admin"`, and (c) set `bot_paused = true`. |
| **FR-4.4** | The dashboard shall provide a **"Hand to bot"** action to resume automated replies. |
| **FR-4.5** | Admin-sent messages and follow-up messages shall be visually tagged in the dashboard (`YOU`, `Follow-up`). |

### 3.5 Property management (Admin)

| ID | Requirement |
|---|---|
| **FR-5.1** | The dashboard shall list all properties as cards, showing thumbnail, title, location, price, status. |
| **FR-5.2** | The admin shall be able to **create** a property (title, type, location, price, bedrooms, area, status, description). |
| **FR-5.3** | The admin shall be able to **edit** any property field. |
| **FR-5.4** | The admin shall be able to **delete** a property; its image rows shall cascade-delete. |
| **FR-5.5** | The admin shall be able to **upload multiple images per property** via drag-and-drop or file picker. |
| **FR-5.6** | The admin shall be able to **delete** individual images; the underlying storage object shall be removed. |
| **FR-5.7** | Image display order shall follow upload order for v1. |

### 3.6 Conversation monitoring

| ID | Requirement |
|---|---|
| **FR-6.1** | The dashboard shall list all conversations sorted by most-recently updated. |
| **FR-6.2** | The dashboard shall stream live updates via Server-Sent Events. |
| **FR-6.3** | Selecting a conversation shall display the full message history (user / assistant bubbles, WhatsApp-style). |
| **FR-6.4** | A live indicator shall confirm SSE connection state. |

### 3.7 Authentication & access control

| ID | Requirement |
|---|---|
| **FR-7.1** | The dashboard shall require a shared password (`DASHBOARD_PASSWORD`) for access. |
| **FR-7.2** | Every API route shall verify the password via `x-dashboard-key` header before performing any operation. |
| **FR-7.3** | The password shall be stored in the browser's `sessionStorage` and cleared on Sign out. |
| **FR-7.4** | A 401 response from any API route shall force re-authentication. |
| **FR-7.5** | *(v2)* Per-user accounts with role-based access (owner / sales / read-only). |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement |
|---|---|
| **NFR-1.1** | Bot reply time: ≤ 8 s end-to-end for ≥ 95% of messages. |
| **NFR-1.2** | Dashboard initial load: ≤ 2 s on a 4G connection. |
| **NFR-1.3** | Image upload: ≤ 3 s per image (≤ 2 MB original). |
| **NFR-1.4** | Conversations list refresh: ≤ 2 s polling interval (live indicator). |

### 4.2 Scalability

| ID | Requirement |
|---|---|
| **NFR-2.1** | The system shall handle **2,000 unique leads per month** with **100 concurrent active conversations**. |
| **NFR-2.2** | Supabase shall be indexed on `wa_conversations.phone` (PK), `wa_conversations.updated_at`, `wa_conversations.last_inbound_at`, `property_images.property_id`. |
| **NFR-2.3** | The follow-up cron shall process all eligible leads within 5 minutes. |

### 4.3 Availability

| ID | Requirement |
|---|---|
| **NFR-3.1** | The webhook endpoint shall accept inbound messages 24/7 with ≥ 99.5% uptime. |
| **NFR-3.2** | No single point of failure other than the third-party APIs (Meta, Groq, Supabase). |
| **NFR-3.3** | If Groq is unreachable, the bot shall send the off-topic fallback reply rather than fail silently. |

### 4.4 Compliance & WhatsApp Policy

| ID | Requirement |
|---|---|
| **NFR-4.1** | The Business Account shall complete **Meta Business Verification** to graduate from the 250-conversation/24h sandbox limit to Tier 1 (1K/24h) and beyond. |
| **NFR-4.2** | All marketing follow-ups outside the 24h window shall use Meta-approved templates. |
| **NFR-4.3** | The bot shall never send unsolicited first-contact messages (Meta opt-in requirement). |
| **NFR-4.4** | Customers shall be able to opt out by replying "STOP" *(v2 — see §10)*. |

### 4.5 Security

| ID | Requirement |
|---|---|
| **NFR-5.1** | `SUPABASE_SERVICE_ROLE_KEY` shall never reach the browser. |
| **NFR-5.2** | All Supabase tables shall have Row-Level Security enabled. |
| **NFR-5.3** | All secrets shall live in Vercel environment variables, not in source control. |
| **NFR-5.4** | Webhook payloads from Meta shall be verified via `WHATSAPP_VERIFY_TOKEN`. |
| **NFR-5.5** | The dashboard password shall be ≥ 12 characters; it shall be rotated quarterly. |

### 4.6 Maintainability

| ID | Requirement |
|---|---|
| **NFR-6.1** | All code shall live in a single Next.js repo, deployable via `git push`. |
| **NFR-6.2** | Property and message schemas shall be backward-compatible (additive changes only). |

---

## 5. System Architecture

```
Customer (WhatsApp)
        │
        ▼
Meta WhatsApp Cloud API ───────► /api/whatsapp (Next.js webhook on Vercel)
        ▲                                │
        │                                ├─► Groq LLM (Aleena reply)
        │                                ├─► Groq Whisper (audio → text)
        │                                └─► Supabase REST
        │                                         │
        │                                         ├── properties (catalog)
        │                                         ├── property_images (URLs)
        │                                         └── wa_conversations
        │                                                  │
        │   ┌──────────────────────────────────────────────┘
        │   │
        │   ▼
  /api/cron/followups  ◄── Vercel Cron (hourly)
        │
        ▼
  Meta Cloud API (sends follow-up — free, in 24h window)


Agency admin (browser)
        │
        ▼
/dashboard ──► /api/conversations, /api/properties, /api/conversations/[phone]/send
              (all gated on DASHBOARD_PASSWORD; service-role key stays on server)
              SSE stream → live conversation updates
```

---

## 6. Phone Number / Setup Requirements

### 6.1 Dedicated WhatsApp Business number
- **Recommended:** Buy a fresh prepaid Jio/Airtel SIM (₹250–500 one-time, ₹250/month plan).
- The number is verified once via OTP in Meta Business Manager → WhatsApp → Add phone number. After that, the SIM only needs to remain active for occasional re-verification.
- **Do not** use the agency owner's personal WhatsApp number — once connected to Cloud API it cannot be used as personal WhatsApp simultaneously.

### 6.2 Meta Business Verification
Required to break the 250-conversation/24h sandbox limit. Process: ~3–10 business days.
Documents needed: CIN / GST / business proof + utility bill.

### 6.3 Quality rating & messaging tiers
- **Tier 1:** 1,000 business-initiated conversations / 24h (after verification)
- **Tier 2:** 10,000 / 24h
- **Tier 3:** 100,000 / 24h
Tier upgrades happen automatically when the rolling 7-day conversation count crosses ~50% of the next tier, provided quality rating stays GREEN.

For 1,000–2,000 leads/month, **Tier 1 is more than sufficient**.

---

## 7. Data Model (key tables)

### 7.1 `properties`
| Column | Type | Notes |
|---|---|---|
| `id` | bigint | PK |
| `title` | text | required |
| `type` | text | apartment / villa / plot / etc. |
| `location` | text | |
| `price` | text | free-form (e.g. "₹68 Lakh") |
| `bedrooms` | int | nullable |
| `area_sqft` | int | nullable |
| `status` | text | available / reserved / sold / draft |
| `description` | text | |
| `created_at` | timestamptz | |

### 7.2 `property_images`
| Column | Type | Notes |
|---|---|---|
| `id` | bigint | PK |
| `property_id` | bigint | FK → properties.id, ON DELETE CASCADE |
| `url` | text | Supabase Storage public URL |
| `display_order` | int | ascending |
| `created_at` | timestamptz | |

### 7.3 `wa_conversations`
| Column | Type | Notes |
|---|---|---|
| `phone` | text | PK |
| `messages` | jsonb | array of `{role, content, by?}` |
| `updated_at` | timestamptz | |
| `last_inbound_at` | timestamptz | for follow-up cron |
| `last_followup_at` | timestamptz | |
| `followup_stage` | int | 0 = none, 1 = sent first |
| `bot_paused` | boolean | true if admin has taken over |

### 7.4 Supabase Storage
- Bucket: `property-images` (public read)
- Path convention: `{property_id}/{timestamp}-{random}.{ext}`

---

## 8. External Interfaces

### 8.1 Meta WhatsApp Cloud API
- Webhook: `POST /api/whatsapp` — receives inbound messages.
- Send text: `POST graph.facebook.com/v21.0/{PHONE_NUMBER_ID}/messages` body `{type: "text"}`.
- Send image: same endpoint, body `{type: "image", image: {link, caption?}}`.
- Template: `{type: "template", template: {name, language, components}}` — *v2*.

### 8.2 Groq API
- `POST /openai/v1/chat/completions` — model `openai/gpt-oss-20b`, temp 0.7, max 512 tokens.
- `POST /openai/v1/audio/transcriptions` — Whisper turbo for voice.

### 8.3 Supabase
- REST (PostgREST) at `${SUPABASE_URL}/rest/v1/...` using service-role key.
- Storage at `${SUPABASE_URL}/storage/v1/object/...`.

---

## 9. Cost Model (steady state, 2,000 leads/month)

Assuming **80% inbound-driven** conversations (free service window) and **20% follow-ups** (also free in 24h window for v1):

| Item | Volume | Unit cost | Monthly |
|---|---|---|---|
| Inbound conversations | 2,000 | Free (first 1k) + ₹0.30 (next 1k) | ₹300 |
| Free 22h follow-ups | ~600 | ₹0 (inside 24h window) | ₹0 |
| Day-3 template msgs (*v2*) | ~400 | ₹0.86 | ₹344 |
| Day-7 template msgs (*v2*) | ~250 | ₹0.86 | ₹215 |
| Groq LLM tokens | ~10M | ~$0.05 / 1M | ~₹400 |
| Vercel hosting | n/a | Hobby = ₹0 / Pro = ₹1,650 | ₹0–1,650 |
| Supabase | n/a | Free tier sufficient | ₹0 |
| Phone SIM | n/a | ₹250 | ₹250 |
| **Total** | | | **~₹1,250 / month (v1)** |
| **Total with v2 templates** | | | **~₹1,800 / month** |
| **+ 18% GST on Meta charges** | | | adds ~₹130 |

(BSP middleware like AiSensy would add ~₹4,500–6,500/month on top — direct Cloud API is the financially optimal path.)

---

## 10. Future Enhancements (out of scope for v1)

| ID | Item |
|---|---|
| **FE-1** | Multi-stage follow-ups (Day 3, Day 7) via Meta-approved marketing templates. |
| **FE-2** | "STOP" / opt-out keyword handling. |
| **FE-3** | Lead status tags (Hot / Warm / Cold) and dashboard filters. |
| **FE-4** | Multi-user dashboard with role-based access. |
| **FE-5** | Site-visit calendar integration (Cal.com booking from inside the chat). |
| **FE-6** | Inline image reorder + cover image selection per property. |
| **FE-7** | Lead source tagging (campaign / referral / organic). |
| **FE-8** | Daily summary email to the agency owner. |
| **FE-9** | Multi-language support (Malayalam / Hindi). |
| **FE-10** | Voice replies (text-to-speech) for accessibility. |

---

## 11. Acceptance Criteria (v1 go-live)

1. ✅ The bot replies to ≥ 95% of inbound text messages within 8 seconds.
2. ✅ The bot transcribes and replies to voice notes.
3. ✅ The bot sends up to 3 property images when asked.
4. ✅ The admin can add/edit/delete properties and photos from the dashboard.
5. ✅ The admin can pause the bot and send manual replies per lead.
6. ✅ Auto follow-ups are sent within 22–24 hours of last inbound, free of cost.
7. ✅ All conversations stream live to the dashboard.
8. ✅ The service-role key never reaches the browser.
9. ⏳ Meta Business Verification approved.
10. ⏳ Dedicated phone number connected and operational.

---

## 12. Deliverables

| Deliverable | Status |
|---|---|
| WhatsApp webhook (`/api/whatsapp`) | ✅ Built |
| Property CRUD API + image upload | ✅ Built |
| Admin dashboard (Conversations + Properties) | ✅ Built |
| Real-time SSE conversation feed | ✅ Built |
| Admin takeover + composer | ✅ Built |
| 22h follow-up cron | ✅ Built |
| Meta Business Verification | ⏳ Pending (agency action) |
| Dedicated phone number | ⏳ Pending (agency action) |
| Marketing template approval (for v2 follow-ups) | ⏳ Pending (agency action) |

---

*End of SRS v1.0*

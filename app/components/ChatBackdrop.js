// Video-backed chat backdrop. Streams a looping fullscreen video
// (the supplied CloudFront URL) behind the prompt; a thin vignette
// keeps the centred heading + prompt text legible over whatever the
// video frame shows.
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

export default function ChatBackdrop() {
  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <video
        className="chatbd__video"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="chatbd__vignette" />
    </div>
  );
}

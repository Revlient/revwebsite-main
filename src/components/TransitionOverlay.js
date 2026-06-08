"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "../context/TransitionContext";

export const TransitionOverlay = ({ color = "#000000" }) => {
  const { state, onCovered } = useTransition();
  const { isTransitioning, targetPage } = state;
  const duration = 0.58;
  const premiumEase = [0.76, 0, 0.24, 1];
  const isInitialLoad = !targetPage;

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          variants={{
            initial: {
              y: "100%",
              borderRadius: "30% 30% 0% 0% / 10% 10% 0% 0%",
              borderTop: "2px solid #e5be6e",
              borderBottom: "0px solid transparent",
            },
            cover: {
              y: "0%",
              borderRadius: "0% 0% 0% 0%",
              borderTop: "0px solid transparent",
              borderBottom: "0px solid transparent",
            },
            animate: {
              y: "0%",
              borderRadius: "0% 0% 0% 0%",
              borderTop: "0px solid transparent",
              borderBottom: "0px solid transparent",
            },
            exit: {
              y: "-100%",
              borderRadius: "0% 0% 30% 30% / 0% 0% 10% 10%",
              borderTop: "0px solid transparent",
              borderBottom: "2px solid #e5be6e",
            },
          }}
          initial={isInitialLoad ? "cover" : "initial"}
          animate="animate"
          exit="exit"
          transition={{ duration, ease: premiumEase }}
          onAnimationComplete={(definition) => {
            if (definition === "animate" && onCovered) {
              onCovered();
            }
          }}
          style={{
            backgroundColor: color,
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.04,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(229, 190, 110, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 190, 110, 0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              zIndex: 0,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{
              opacity: 1,
              scale: [0.8, 1.05, 1],
              y: 0,
              filter: "drop-shadow(0 0 20px rgba(229,190,110,0.6))",
            }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ delay: duration * 0.15, duration: duration * 0.7 }}
            style={{
              color: "#e5be6e",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src="/logo.svg"
              alt="Brand"
              width="120"
              height="120"
              draggable={false}
              style={{ display: "block" }}
            />
            <span
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                letterSpacing: "0.25em",
                fontSize: "10px",
                color: "#e5be6e",
                textTransform: "uppercase",
                opacity: 0.8,
                marginTop: "8px",
              }}
            >
              Revlient
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
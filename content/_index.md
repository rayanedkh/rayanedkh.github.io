---
title: ''
summary: 'Rayane Dakhlaoui is an AI research student working on self-supervised representation learning, 3D vision and world models, looking for a PhD starting in 2027.'
date: 2026-09-21
type: landing

design:
  spacing: '0'

sections:
  # ── Introduction centrée : gif en haut, Now / Before / Next ─────────────────
  - block: dev-hero
    id: intro
    content:
      username: me
      image_side: left
      greeting: "Hi, I'm"
      show_status: false
      show_scroll_indicator: true
      typewriter:
        enable: false
      cta_buttons:
        - text: View My Work
          url: "#featured-projects"
          icon: arrow-down
        - text: Download CV
          url: "/uploads/cv.pdf"
          new_tab: true
          icon: arrow-down-tray
        - text: Get In Touch
          url: "#contact"
          icon: envelope
    design:
      style: centered
      animations: true
      background:
        color:
          light: "#fafafa"
          dark: "#0a0a0f"
      spacing:
        padding: ["0rem", "0", "4rem", "0"]

  # ── Projets : une seule section, filtrable par mot-clé ──────────────────────
  - block: all-publications
    id: featured-projects
    content:
      title: "Featured Projects"
      subtitle: "A selection of my recent work"
      filters:
        folders:
          - projects
      count: 0
      sort_by: order
      sort_ascending: true
    design:
      background:
        color:
          light: "#ffffff"
          dark: "#111827"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # ── Expérience ──────────────────────────────────────────────────────────────
  - block: resume-experience
    id: experience
    content:
      title: "💼 Experience"
      date_format: Jan 2006
    design:
      columns: '1'
      background:
        color:
          light: "#f5f5f5"
          dark: "#0b1220"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # ── Formation ───────────────────────────────────────────────────────────────
  - block: resume-education
    id: education
    content:
      title: "🎓 Education"
      date_format: Jan 2006
    design:
      columns: '1'
      background:
        color:
          light: "#ffffff"
          dark: "#111827"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # ── Bénévolat ───────────────────────────────────────────────────────────────
  - block: resume-volunteering
    id: volunteering
    content:
      title: "🤝 Volunteering"
      date_format: Jan 2006
    design:
      columns: '1'
      background:
        color:
          light: "#f5f5f5"
          dark: "#0b1220"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # ── Contact ─────────────────────────────────────────────────────────────────
  - block: contact-info
    id: contact
    content:
      title: "✉️ Get In Touch"
      text: |-
        I am looking for a PhD starting in 2027, at the intersection of multimodal learning,
        egocentric vision, action recognition, world modelling, self-supervised learning,
        3D vision and video understanding.
        If you are recruiting, collaborating, or would simply like to discuss these topics, feel free to reach out.
      email: rayane.dakhlaoui@telecom-paris.fr
      autolink: true
    design:
      columns: '1'
      background:
        color:
          light: "#ffffff"
          dark: "#111827"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]
---

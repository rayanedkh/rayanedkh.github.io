---
title: 'Projects'
date: 2026-09-19
type: landing

# Applied to every project page
cascade:
  reading_time: false

design:
  spacing: '3rem'

sections:
  - block: portfolio
    id: all-projects
    content:
      title: "All Projects"
      subtitle: "Research projects, coursework, competitions and paper readings. Filter by topic."
      count: 0
      filters:
        folders:
          - projects
      buttons:
        - name: All
          tag: '*'
        - name: Self-supervised Learning
          tag: Self-supervised Learning
        - name: 3D Vision
          tag: 3D Vision
        - name: World Modelling
          tag: World Modelling
        - name: Generative Models
          tag: Generative Models
        - name: Representation Learning
          tag: Representation Learning
        - name: Computer Vision
          tag: Computer Vision
        - name: Kernel Methods
          tag: Kernel Methods
        - name: Applied ML
          tag: Applied ML
      default_button_index: 0
      sort_by: order
      sort_ascending: true
    design:
      columns: 3
      spacing:
        padding: ["2rem", "0", "4rem", "0"]
---

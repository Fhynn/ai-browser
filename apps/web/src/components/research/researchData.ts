import type { ResearchPaper } from "./types";

export const DEFAULT_RESEARCH_COMMAND = "Carikan 5 jurnal terbaru tentang AI untuk deteksi sampah pakai YOLO.";

export const researchExampleChips = [
  "YOLO waste detection",
  "ESP32 computer vision",
  "IoT smart waste bin",
  "AI recycling classification"
];

export const researchClarificationAnswers = ["Skripsi / prototype IoT", "Implementasi industri", "Review literatur umum"];

export const researchPapers: ResearchPaper[] = [
  {
    id: "paper-yolo-recycling-2026",
    title: "YOLO-Based Waste Object Detection for Smart Recycling Systems",
    year: "2026",
    method: "YOLOv8",
    dataset: "TACO + custom waste dataset",
    bestFor: "Prototype IoT",
    relevance: 96,
    summary: "Demo paper focused on detecting recyclable and non-recyclable objects with a modern YOLO pipeline.",
    whyUseful: "Strong fit for real-time camera demos because the method maps directly to object detection workflows.",
    source: "demo://research/yolo-smart-recycling-2026",
    notes: "Best starting point for a student prototype with camera-based sorting."
  },
  {
    id: "paper-trash-cv-2025",
    title: "Deep Learning Approach for Real-Time Trash Classification Using Computer Vision",
    year: "2025",
    method: "CNN",
    dataset: "TrashNet",
    bestFor: "Literature review",
    relevance: 88,
    summary: "Demo paper showing a baseline image-classification approach for trash categories.",
    whyUseful: "Useful as a comparison baseline before choosing a YOLO detector for live scenes.",
    source: "demo://research/realtime-trash-classification-2025",
    notes: "Good for explaining why detection and classification solve different problems."
  },
  {
    id: "paper-yolov8-smart-bin-2024",
    title: "Smart Waste Sorting with YOLOv8 and Embedded Camera Systems",
    year: "2024",
    method: "YOLOv8 + embedded camera",
    dataset: "Smart bin camera dataset",
    bestFor: "Edge demo",
    relevance: 94,
    summary: "Demo paper describing smart-bin camera capture and lightweight inference constraints.",
    whyUseful: "Directly supports the prototype story because it connects detection with embedded deployment.",
    source: "demo://research/yolov8-embedded-smart-bin-2024",
    notes: "Most relevant for demo-ready architecture and deployment discussion."
  },
  {
    id: "paper-plastic-organic-2023",
    title: "Computer Vision-Based Plastic and Organic Waste Detection",
    year: "2023",
    method: "MobileNet",
    dataset: "Custom plastic-organic dataset",
    bestFor: "Dataset framing",
    relevance: 82,
    summary: "Demo paper focusing on plastic and organic waste separation with compact visual models.",
    whyUseful: "Helpful for narrowing class labels and designing a small labeled dataset.",
    source: "demo://research/plastic-organic-detection-2023",
    notes: "Good for dataset planning, less complete for object localization."
  },
  {
    id: "paper-edge-ai-bins-2022",
    title: "Edge AI for Waste Detection in IoT-Enabled Smart Bins",
    year: "2022",
    method: "Edge AI + YOLOv5",
    dataset: "Smart bin camera dataset",
    bestFor: "IoT architecture",
    relevance: 91,
    summary: "Demo paper covering deployment constraints, edge devices, and inference latency in smart-bin systems.",
    whyUseful: "Useful for connecting AI detection to ESP32-class sensors, cameras, and lightweight deployment choices.",
    source: "demo://research/edge-ai-smart-bins-2022",
    notes: "Strong architecture reference for an IoT smart waste bin."
  }
];

export const researchRecommendation =
  "Untuk prototype IoT deteksi sampah, paper yang paling relevan adalah paper dengan metode YOLOv8 + edge camera karena cocok untuk demo real-time dan deployment ringan.";

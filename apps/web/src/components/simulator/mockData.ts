import type { AgentMode } from "@browsepilot/shared";
import type { MockProductResult, MockResearchResult, MockWorkflowSummary } from "./types";

export const commandExamples = [
  "Carikan 5 jurnal terbaru tentang YOLO untuk deteksi sampah.",
  "Cari susu yang bagus untuk anak saya.",
  "Cari baju murah tapi kualitas bagus.",
  "Ringkas halaman ini jadi 5 poin.",
  "Cari dokumentasi deploy Cloud Run.",
  "Bantu isi form ini, tapi jangan submit dulu."
];

export const researchClarificationAnswers = ["Skripsi / prototype IoT", "Implementasi industri", "Review literatur umum"];

export const shoppingClarificationAnswers = [
  "Usia 3 tahun, tidak ada alergi, budget 100 ribuan",
  "Usia 1 tahun, perlu rekomendasi aman",
  "Belum yakin, bantu tanya hal penting dulu"
];

export const researchResults: MockResearchResult[] = [
  {
    title: "YOLOv8-Based Waste Detection for Smart Sorting Systems",
    year: "2025",
    method: "YOLOv8 + transfer learning",
    relevance: "94",
    summary: "Strong prototype reference for real-time waste object detection with modern YOLO architecture.",
    source: "demo://research/yolo-waste-2025"
  },
  {
    title: "Deep Learning Waste Classification Using YOLO and Mobile Cameras",
    year: "2024",
    method: "YOLOv5 + mobile capture",
    relevance: "89",
    summary: "Useful for camera placement and lightweight deployment tradeoffs.",
    source: "demo://research/mobile-waste-2024"
  },
  {
    title: "Trash Detection Dataset Benchmark for Robotic Sorting",
    year: "2023",
    method: "YOLO comparison benchmark",
    relevance: "86",
    summary: "Good dataset comparison baseline for thesis or prototype evaluation.",
    source: "demo://research/trash-benchmark-2023"
  },
  {
    title: "Real-Time Recyclable Object Detection in Public Waste Bins",
    year: "2022",
    method: "YOLOv4-tiny edge inference",
    relevance: "81",
    summary: "Relevant for IoT edge deployment and low-power inference constraints.",
    source: "demo://research/recyclable-edge-2022"
  }
];

export const shoppingResults: MockProductResult[] = [
  {
    name: "Demo Grow Milk Plain 3+",
    age: "3 tahun ke atas",
    price: "Rp96.000 / 750g",
    rating: "4.8 / 5",
    sugar: "Rendah gula, varian plain",
    caution: "Cek komposisi dan kebutuhan anak",
    sellerTrust: "Official store demo"
  },
  {
    name: "Demo Nutri Junior Low Sugar",
    age: "3-6 tahun",
    price: "Rp108.000 / 800g",
    rating: "4.7 / 5",
    sugar: "Gula lebih rendah dari varian rasa",
    caution: "Tidak untuk anak dengan alergi susu sapi",
    sellerTrust: "Seller rating tinggi"
  },
  {
    name: "Demo Everyday Calcium Kids",
    age: "3 tahun ke atas",
    price: "Rp88.000 / 700g",
    rating: "4.6 / 5",
    sugar: "Perlu cek label per sajian",
    caution: "Konsultasi untuk kondisi khusus",
    sellerTrust: "Pengiriman stabil"
  }
];

export const workflowSummary: MockWorkflowSummary = {
  summary: "Cloud Run deployment requires a containerized web app, a production build, an exposed port, and deployment through Google Cloud CLI or console.",
  keyPoints: [
    "Only the web app should deploy to Cloud Run.",
    "The extension is built separately and loaded in Chrome.",
    "Runtime should listen on process.env.PORT or 8080.",
    "Environment variables must not include hardcoded API keys."
  ],
  presentationBullets: [
    "Build production web app artifact.",
    "Package server in a container.",
    "Deploy image to Cloud Run.",
    "Verify route health and environment configuration."
  ]
};

export function getModeTitle(mode: AgentMode | null): string {
  if (!mode) {
    return "Ready";
  }

  return mode.replace("_", " ").toUpperCase();
}

export function getBrowserUrl(mode: AgentMode | null): string {
  if (mode === "research") {
    return "https://browsepilot.demo/search?q=yolo+waste+detection+papers";
  }

  if (mode === "shopping") {
    return "https://browsepilot.demo/shop?q=child+milk+safe+options";
  }

  if (mode === "workflow") {
    return "https://cloud.google.com/run/docs/demo";
  }

  if (mode === "summarize") {
    return "https://browsepilot.demo/current-page";
  }

  if (mode === "form_assist") {
    return "https://browsepilot.demo/form-assist";
  }

  return "about:blank";
}

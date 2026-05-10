import type { WorkflowOutput, WorkflowSection } from "./types";

export const DEFAULT_WORKFLOW_COMMAND = "Ringkas halaman ini dan buat poin presentasi.";

export const workflowExampleChips = [
  "Ringkas halaman ini jadi 5 poin.",
  "Buat action items dari halaman ini.",
  "Ubah artikel ini jadi poin presentasi.",
  "Cari bagian penting dari dokumentasi ini.",
  "Buat catatan belajar dari halaman ini."
];

export const workflowSections: WorkflowSection[] = [
  {
    id: "setup",
    title: "Persiapan Project",
    body: "Siapkan struktur project, dependency, dan konfigurasi runtime sebelum membuat build production.",
    snippet: "npm install"
  },
  {
    id: "build",
    title: "Build Aplikasi",
    body: "Jalankan build lokal dan pastikan aplikasi tidak memiliki error TypeScript, lint, atau bundling.",
    snippet: "npm run build:web"
  },
  {
    id: "environment",
    title: "Environment Variables",
    body: "Simpan API key dan konfigurasi runtime sebagai environment variables, bukan hardcoded di source code.",
    snippet: "GEMINI_API_KEY=..."
  },
  {
    id: "deploy",
    title: "Deploy ke Cloud Run",
    body: "Deploy container web app ke Cloud Run dan pastikan service mendengarkan PORT yang diberikan runtime.",
    snippet: "gcloud run deploy browsepilot-web"
  },
  {
    id: "verify",
    title: "Verifikasi URL",
    body: "Buka URL publik hasil deploy, uji route utama, dan cek apakah asset serta environment terbaca.",
    snippet: "curl https://service-url.run.app"
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    body: "Jika terjadi error runtime, cek log Cloud Run, environment variables, port binding, dan hasil build.",
    snippet: "gcloud run services logs read"
  }
];

export const importantTerms = ["Cloud Run", "production build", "environment variables", "public URL", "runtime logs", "PORT 8080"];

export const workflowOutput: WorkflowOutput = {
  summary:
    "Halaman ini menjelaskan proses menyiapkan project, menjalankan build, mengatur environment variable, melakukan deploy ke Cloud Run, dan memverifikasi URL aplikasi.",
  keyPoints: [
    "Persiapkan project dan dependency.",
    "Pastikan build production berhasil.",
    "Simpan API key di environment variables.",
    "Deploy web app ke Cloud Run.",
    "Verifikasi URL publik setelah deploy.",
    "Cek log jika ada error runtime."
  ],
  presentationBullets: [
    "Slide 1: Tujuan Deploy",
    "Slide 2: Persiapan Project",
    "Slide 3: Build dan Environment",
    "Slide 4: Deploy Cloud Run",
    "Slide 5: Verifikasi dan Troubleshooting"
  ],
  actionItems: [
    "Jalankan build lokal.",
    "Cek environment variables.",
    "Deploy ke Cloud Run.",
    "Buka URL hasil deploy.",
    "Uji semua flow utama.",
    "Catat error dari log jika ada."
  ]
};

export function createWorkflowMarkdown(): string {
  return `# Deploy Web App ke Cloud Run dari AI Studio

## Summary
${workflowOutput.summary}

## Key Points
${workflowOutput.keyPoints.map((item) => `- ${item}`).join("\n")}

## Presentation Bullets
${workflowOutput.presentationBullets.map((item) => `- ${item}`).join("\n")}

## Action Items
${workflowOutput.actionItems.map((item) => `- ${item}`).join("\n")}
`;
}

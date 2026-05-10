import type { ShoppingProduct } from "./types";

export const DEFAULT_SHOPPING_COMMAND = "Carikan susu yang bagus untuk anak saya.";

export const shoppingExampleChips = [
  "Carikan susu yang bagus untuk anak saya.",
  "Cari baju murah tapi kualitas bagus.",
  "Cari keyboard mechanical budget 500 ribuan.",
  "Cari laptop ringan untuk coding.",
  "Bandingkan produk yang ratingnya paling aman."
];

export const shoppingClarificationAnswers = [
  "Usia 3 tahun, tidak ada alergi, budget 100 ribuan",
  "Usia 1 tahun, perlu rekomendasi aman",
  "Belum yakin, bantu tanya hal penting dulu"
];

export const shoppingFilters = ["usia 3+", "budget 100 ribuan", "rating tinggi", "rendah gula", "seller terpercaya"];

export const shoppingProducts: ShoppingProduct[] = [
  {
    id: "nutrikid-plain-3",
    name: "NutriKid Plain Milk 3+",
    ageSuitability: "3 tahun ke atas",
    price: "Rp98.000",
    size: "750g",
    rating: "4.8 / 5",
    sellerTrust: "Official demo store",
    sugarNote: "Plain, gula lebih rendah dari varian rasa",
    caution: "Cek label komposisi dan kebutuhan anak",
    whyRecommended: "Masuk budget, sesuai usia 3+, dan memiliki sinyal seller trust baik.",
    link: "demo://shopping/nutrikid-plain-3"
  },
  {
    id: "growsmart-vanilla-low-sugar",
    name: "GrowSmart Vanilla Low Sugar 3+",
    ageSuitability: "3 tahun ke atas",
    price: "Rp106.000",
    size: "800g",
    rating: "4.7 / 5",
    sellerTrust: "Seller rating tinggi",
    sugarNote: "Low sugar, tetap cek takaran saji",
    caution: "Tidak untuk anak dengan alergi susu sapi",
    whyRecommended: "Rating tinggi dan ukuran besar, tetapi perlu cek varian rasa dan komposisi.",
    link: "demo://shopping/growsmart-vanilla-low-sugar"
  },
  {
    id: "kinderpure-uht-plain",
    name: "KinderPure UHT Plain 3+",
    ageSuitability: "3 tahun ke atas",
    price: "Rp92.000",
    size: "12 x 125ml",
    rating: "4.6 / 5",
    sellerTrust: "Pengiriman stabil",
    sugarNote: "Plain UHT, cek gula per kemasan",
    caution: "Perhatikan penyimpanan dan tanggal kedaluwarsa",
    whyRecommended: "Praktis untuk konsumsi harian dan masih berada di kisaran budget.",
    link: "demo://shopping/kinderpure-uht-plain"
  },
  {
    id: "littlecalcium-fortified",
    name: "LittleCalcium Fortified Milk 3+",
    ageSuitability: "3 tahun ke atas",
    price: "Rp112.000",
    size: "850g",
    rating: "4.5 / 5",
    sellerTrust: "Trusted demo seller",
    sugarNote: "Fortified, cek gula tambahan",
    caution: "Bandingkan komposisi dengan kebutuhan anak",
    whyRecommended: "Ukuran besar dan rating baik, tetapi sedikit di atas budget utama.",
    link: "demo://shopping/littlecalcium-fortified"
  },
  {
    id: "smartgrow-daily",
    name: "SmartGrow Daily Milk 3+",
    ageSuitability: "3 tahun ke atas",
    price: "Rp89.000",
    size: "700g",
    rating: "4.4 / 5",
    sellerTrust: "Seller respon cepat",
    sugarNote: "Perlu cek label gula per sajian",
    caution: "Jangan digunakan untuk bayi di bawah 12 bulan",
    whyRecommended: "Paling ekonomis dalam daftar demo dan sesuai kebutuhan umum usia 3+.",
    link: "demo://shopping/smartgrow-daily"
  }
];

export const shoppingRecommendation =
  "Berdasarkan kebutuhan usia 3 tahun, tidak ada alergi, dan budget 100 ribuan, opsi terbaik adalah produk dengan label usia 3+, rating tinggi, seller trust baik, dan catatan gula lebih rendah. BrowsePilot menyiapkan rekomendasi, tetapi keputusan akhir tetap pada user.";

export const shoppingSafetyNote =
  "Informasi ini bukan pengganti saran dokter. Untuk bayi di bawah 12 bulan, alergi, lactose intolerance, atau kondisi khusus, konsultasikan dengan tenaga kesehatan.";

export const shoppingBehaviorNote =
  "BrowsePilot akan selalu bertanya umur anak, alergi, dan budget sebelum memberi rekomendasi produk anak.";

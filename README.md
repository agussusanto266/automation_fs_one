# automation_fs_one

Test otomatis untuk:

- **UI**: website [Swag Labs (saucedemo.com)](https://www.saucedemo.com), dijalankan lewat browser.
- **API**: [DummyJSON](https://dummyjson.com), dijalankan tanpa browser *(sedang disiapkan)*.

Skenario test ditulis dalam **bahasa sehari-hari (format Gherkin)**, sehingga bisa dibaca oleh siapa saja, termasuk yang tidak bisa coding. Skenario tersebut kemudian dijalankan secara otomatis oleh **Playwright**.

## Istilah penting

| Istilah | Artinya |
|---|---|
| **Feature** | File `.feature` yang berisi daftar skenario untuk satu fitur, misalnya fitur Login. |
| **Scenario** | Satu kasus uji, misalnya "login dengan akun yang valid". |
| **Step** | Satu kalimat di dalam skenario. Diawali **Given** (kondisi awal), **When** (aksi), atau **Then** (hasil yang diharapkan). |
| **Step definition** | Kode yang menjalankan satu kalimat step. |
| **Page Object** | Kode yang mewakili satu halaman website: di mana letak tombol/kolom dan apa yang bisa dilakukan di halaman itu. |
| **API client** | Sama seperti Page Object, tetapi untuk API: endpoint apa saja yang bisa dipanggil. |
| **Fixture** | "Pelayan" yang menyiapkan Page Object / API client untuk setiap skenario, sehingga setiap skenario berjalan terpisah dan tidak saling mengganggu. |
| **Test data** | Data yang dipakai test, misalnya akun login. Disimpan di satu tempat agar mudah diubah. |
| **Tag** | Label di atas skenario (contoh: `@smoke`) untuk memilih skenario mana yang dijalankan. |

## Tech stack

| Tool | Kegunaan |
|---|---|
| [Playwright](https://playwright.dev) | Menjalankan browser dan mengirim request API |
| [playwright-bdd](https://github.com/vitalets/playwright-bdd) | Menjalankan file `.feature` (Gherkin) di Playwright |
| TypeScript | Bahasa untuk step definition, Page Object, dan API client |

## Prasyarat

- [Node.js](https://nodejs.org) versi LTS (v20 atau lebih baru)
- Git

## Instalasi

```bash
git clone <url-repo-ini>
cd automation_fs_one
npm install
npx playwright install
```

`npx playwright install` mengunduh browser yang dibutuhkan untuk test UI.

## Menjalankan test

| Perintah | Keterangan |
|---|---|
| `npm test` | Menjalankan semua test (UI + API) tanpa menampilkan browser |
| `npm run test:headed` | Menjalankan semua test dengan browser terlihat |
| `npm run test:smoke` | Menjalankan skenario bertag `@smoke` saja, dengan browser terlihat |
| `npm run report` | Membuka laporan (HTML report) hasil test terakhir |

Menjalankan test UI saja atau API saja:

```bash
npx bddgen && npx playwright test --project=ui
npx bddgen && npx playwright test --project=api
```

Menjalankan satu skenario berdasarkan namanya:

```bash
npx bddgen && npx playwright test -g "Logout Successfully"
```

Mode debug (menjalankan langkah demi langkah):

```bash
npx bddgen && npx playwright test --debug
```

> **Apa itu `bddgen`?** Perintah ini mengubah file `.feature` menjadi file test yang dimengerti Playwright, dan menyimpannya di folder `.features-gen/`. Folder itu dibuat otomatis, jadi jangan diedit manual.

## Membaca hasil test

- **passed** ✅: hasil di website/API sesuai dengan yang diharapkan di skenario.
- **failed** ❌: ada yang tidak sesuai. Pesan error menampilkan **Expected** (yang diharapkan) dan **Received** (yang sebenarnya terjadi).

Untuk melihat detailnya, jalankan `npm run report`. Untuk test UI yang gagal, laporan juga menyertakan:

- **Screenshot** halaman saat test gagal.
- **Trace**: rekaman langkah demi langkah (klik, isi kolom, perpindahan halaman) yang bisa diputar ulang untuk mencari penyebab kegagalan.

## Struktur project

```
automation_fs_one/
├── features/                  # SKENARIO TEST (bahasa sehari-hari) + step definition
│   ├── ui/
│   │   ├── login.feature
│   │   ├── logout.feature
│   │   └── steps/
│   │       ├── fixtures.ts    # menyiapkan Page Object untuk setiap skenario
│   │       ├── login.step.ts
│   │       └── logout.step.ts
│   └── api/                   # skenario API (sedang disiapkan)
├── pages/                     # PAGE OBJECT: satu file per halaman website
│   ├── LoginPage.ts           # halaman login
│   └── InventoryPage.ts       # halaman daftar produk (termasuk menu dan logout)
├── api/                       # API CLIENT: satu file per kelompok endpoint
│   └── ProductApi.ts          # endpoint produk (sedang disiapkan)
├── test-data/                 # DATA TEST: akun, produk, dll.
│   ├── users.ts               # akun login
│   └── products.ts            # data produk (sedang disiapkan)
├── playwright.config.ts       # pengaturan Playwright (project ui dan api)
├── tsconfig.json
└── package.json
```

## Cakupan test

### UI: Login (`features/ui/login.feature`)
- Login berhasil dengan akun valid → masuk ke halaman produk `@smoke`
- Login ditolak untuk akun yang diblokir
- Validasi input login:
  - username kosong
  - password kosong
  - username dan password salah

### UI: Logout (`features/ui/logout.feature`)
- Logout berhasil → kembali ke halaman login `@smoke`

### API
Sedang disiapkan.

## Cara kerja

Test UI:

```
.feature  →  step definition  →  fixture  →  Page Object  →  browser
```

Test API:

```
.feature  →  step definition  →  fixture  →  API client   →  API
```

- **Feature**: menjelaskan *apa* yang dites, dalam bahasa sehari-hari.
- **Step definition**: menghubungkan setiap kalimat ke kode. Isinya hanya memanggil Page Object / API client lalu mengecek hasilnya.
- **Fixture**: menyiapkan Page Object / API client untuk setiap skenario.
- **Page Object / API client**: menyimpan detail teknis (letak elemen, alamat endpoint). Detail teknis hanya ditulis di sini, sehingga jika website berubah cukup diperbaiki di satu tempat.

## Data test

Semua data test disimpan di folder `test-data/`, bukan ditulis langsung di step. Jika data berubah (misalnya password), cukup ubah satu file.

Akun login (`test-data/users.ts`) berasal dari halaman login saucedemo dan memang publik untuk latihan:

| Nama di kode | Username | Keterangan |
|---|---|---|
| `users.validUser` | `standard_user` | Akun normal, bisa login |
| `users.lockedUser` | `locked_out_user` | Akun yang diblokir, login selalu ditolak |

> Di project sungguhan, password asli **tidak boleh** disimpan di repository. Gunakan file `.env` yang tidak ikut di-upload ke GitHub.

## Tag

| Tag | Artinya |
|---|---|
| `@smoke` | Skenario paling penting. Dijalankan untuk pengecekan cepat bahwa fitur utama berfungsi. |

## Menambah test case baru

1. Tulis skenario di file `.feature` (`features/ui/` atau `features/api/`). Pakai ulang kalimat step yang sudah ada jika maknanya sama.
2. **UI:** cari locator elemen (prioritas: role → `data-test` → id), lalu tambahkan di Page Object (`pages/`).
   **API:** tambahkan method untuk endpoint di API client (`api/`).
3. Jika ada Page Object / API client baru, daftarkan di `fixtures.ts` pada folder `steps` yang sesuai.
4. Jika butuh data baru, tambahkan di `test-data/`.
5. Tulis step definition di folder `steps` yang sesuai.
6. Jalankan `npx bddgen` untuk memastikan tidak ada step yang belum terdefinisi.
7. Jalankan test dan pastikan hasilnya passed.

## Rekomendasi VS Code extension

- **Playwright Test for VSCode** (Microsoft): menjalankan test dan memilih locator langsung dari editor
- **Cucumber** (resmi): pewarnaan teks Gherkin dan lompat dari kalimat step ke kodenya (Ctrl + klik / F12)

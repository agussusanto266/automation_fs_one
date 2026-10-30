# automation_fs_one

UI test automation untuk [Swag Labs (saucedemo.com)](https://www.saucedemo.com) menggunakan **Playwright** dan **BDD (Gherkin)** lewat [playwright-bdd](https://github.com/vitalets/playwright-bdd).

Skenario ditulis dalam format Gherkin (`.feature`), lalu dijalankan oleh Playwright Test Runner. Dengan begitu, fitur Playwright seperti parallel run, retry, trace, dan HTML report tetap bisa dipakai.

## Tech stack

| Tool | Kegunaan |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation dan test runner |
| [playwright-bdd](https://github.com/vitalets/playwright-bdd) | Menjalankan file `.feature` (Gherkin) di Playwright |
| TypeScript | Bahasa untuk step definition dan Page Object |

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

`npx playwright install` mengunduh browser yang dibutuhkan Playwright.

## Menjalankan test

| Perintah | Keterangan |
|---|---|
| `npm test` | Menjalankan semua skenario (headless) |
| `npm run test:headed` | Menjalankan semua skenario dengan browser terlihat |
| `npm run test:smoke` | Menjalankan skenario bertag `@smoke` saja |
| `npm run report` | Membuka HTML report hasil test terakhir |

Menjalankan satu skenario berdasarkan namanya:

```bash
npx bddgen && npx playwright test -g "Logout Successfully"
```

Mode debug (eksekusi langkah demi langkah):

```bash
npx bddgen && npx playwright test --debug
```

> `bddgen` mengubah file `.feature` menjadi file test Playwright di folder `.features-gen/`. Folder itu dibuat otomatis, jadi jangan diedit manual.

## Struktur project

```
automation_fs_one/
├── features/
│   ├── login.feature        # skenario login
│   ├── logout.feature       # skenario logout
│   └── steps/
│       ├── fixtures.ts      # custom fixture (inject Page Object ke step)
│       ├── login.step.ts    # step definition login
│       └── logout.step.ts   # step definition logout
├── pages/
│   ├── LoginPage.ts         # Page Object halaman login
│   └── LogoutPage.ts        # Page Object menu dan logout
├── playwright.config.ts     # konfigurasi Playwright dan playwright-bdd
├── tsconfig.json
└── package.json
```

## Cakupan test

### Login (`features/login.feature`)
- Login berhasil dengan user valid → diarahkan ke halaman inventory `@smoke`
- Login gagal dengan user yang terkunci (`locked_out_user`)
- Validasi input login (Scenario Outline):
  - username kosong
  - password kosong
  - username dan password salah

### Logout (`features/logout.feature`)
- Logout berhasil → kembali ke halaman login `@smoke`

## Arsitektur

Alur dari skenario sampai aksi di browser:

```
.feature (Gherkin)  →  step definition  →  fixture  →  Page Object  →  browser
```

- **Feature**: menjelaskan *apa* yang dites, dalam bahasa yang mudah dibaca.
- **Step definition**: menghubungkan setiap kalimat Gherkin ke kode. Isinya hanya memanggil Page Object dan assertion.
- **Fixture**: menyiapkan instance Page Object untuk setiap skenario, sehingga tiap skenario terisolasi dan aman dijalankan paralel.
- **Page Object**: menyimpan locator dan aksi per halaman. Locator hanya ditulis di sini.

## Menambah test case baru

1. Tulis skenario di file `.feature`. Pakai ulang kalimat step yang sudah ada jika maknanya sama.
2. Cari locator elemen (prioritas: role → `data-test` → id).
3. Tambahkan locator dan aksi di Page Object, atau buat Page Object baru untuk halaman baru.
4. Jika ada Page Object baru, daftarkan di `features/steps/fixtures.ts`.
5. Tulis step definition di `features/steps/`.
6. Jalankan `npx bddgen` untuk memastikan tidak ada step yang belum terdefinisi.
7. Jalankan test dan pastikan hasilnya passed.

## Data test

Akun yang dipakai berasal dari halaman login saucedemo (akun publik untuk latihan):

| Username | Password | Keterangan |
|---|---|---|
| `standard_user` | `secret_sauce` | User normal |
| `locked_out_user` | `secret_sauce` | User yang terkunci |

## Rekomendasi VS Code extension

- **Playwright Test for VSCode** (Microsoft): menjalankan test dan memilih locator dari editor
- **Cucumber** (resmi): syntax highlight Gherkin dan navigasi step ke definisinya (Ctrl + klik / F12)

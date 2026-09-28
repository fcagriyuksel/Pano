/* Her yerde kullanılan yardımcılar (şemalar, hesaplayıcılar, simülasyonlar ve uygulama). */

/* Sayıyı Türkçe biçimde yazar: 1.234,5. b: en fazla ondalık basamak (varsayılan 2). */
/* Başlık yazımı: her kelimenin ilk harfi büyür (Türkçe: i → İ). Bağlaçlar (TDK), içinde büyük harf olan kısaltma ve birimler
   (mA, kW, PLC), küçük harfli birimler ve Latin olmayan harfle başlayan kelimeler (φ, μ) olduğu gibi kalır. Veride başlıklar cümle düzeninde yazılır. */
const BASLIK_KUCUK = new Set(['ve', 'ile', 'ya', 'da', 'de', 'veya', 'ki', 'mi', 'mı', 'mu', 'mü']);
const BASLIK_SABIT = new Set(['mm', 'mm²', 'cm', 'ms', 'sn', 'dk', 'd/dk', 'cos', 'sin', 'tan', 'x']);
const baslikYaz = (m) => String(m).split(' ').map((k, i) => {
  if ((i > 0 && BASLIK_KUCUK.has(k)) || BASLIK_SABIT.has(k) || /\p{Lu}/u.test(k)) return k;
  const j = k.search(/\p{L}/u);
  if (j < 0 || !/[a-zçğıöşü]/.test(k[j])) return k;
  return k.slice(0, j) + k[j].toLocaleUpperCase('tr-TR') + k.slice(j + 1);
}).join(' ');

const sayi = (n, b) => { try { return Number(n).toLocaleString('tr-TR', { maximumFractionDigits: b == null ? 2 : b }); } catch (e) { return String(Math.round(n * 100) / 100); } };

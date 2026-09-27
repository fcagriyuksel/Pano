/* Her yerde kullanılan yardımcılar (şemalar, hesaplayıcılar, simülasyonlar ve uygulama). */

/* Sayıyı Türkçe biçimde yazar: 1.234,5. b: en fazla ondalık basamak (varsayılan 2). */
const sayi = (n, b) => { try { return Number(n).toLocaleString('tr-TR', { maximumFractionDigits: b == null ? 2 : b }); } catch (e) { return String(Math.round(n * 100) / 100); } };

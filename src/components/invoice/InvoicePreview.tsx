import agencyLogo from "@/assets/agency-logo.png";

export interface InvoiceService {
  id: string;
  description: string;
  quantity: number;
  price: string;
}

interface InvoiceData {
  invoiceType: "advance" | "final" | "full";
  clientName: string;
  clientAddress: string;
  clientNIP: string;
  invoiceNumber: string;
  issueDate: string;
  services: InvoiceService[];
  amount: string;
  advanceAmount: string;
  paymentDue: string;
  bankName: string;
  bankAccount: string;
  agencyName: string;
  agencyOwner: string;
  agencyAddress: string;
  agencyNIP: string;
}

interface InvoicePreviewProps {
  data: InvoiceData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
};

const formatAmount = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount || "0") : amount;
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const numberToWords = (num: number): string => {
  const ones = ["", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"];
  const teens = ["dziesięć", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście"];
  const tens = ["", "", "dwadzieścia", "trzydzieści", "czterdzieści", "pięćdziesiąt", "sześćdziesiąt", "siedemdziesiąt", "osiemdziesiąt", "dziewięćdziesiąt"];
  const hundreds = ["", "sto", "dwieście", "trzysta", "czterysta", "pięćset", "sześćset", "siedemset", "osiemset", "dziewięćset"];
  const thousands = ["", "tysiąc", "tysiące", "tysięcy"];

  if (num === 0) return "zero";
  
  const getThousandForm = (n: number) => {
    if (n === 1) return thousands[1];
    if (n >= 2 && n <= 4) return thousands[2];
    return thousands[3];
  };

  let result = "";
  const th = Math.floor(num / 1000);
  const h = Math.floor((num % 1000) / 100);
  const t = Math.floor((num % 100) / 10);
  const o = num % 10;

  if (th > 0) {
    if (th === 1) result += "tysiąc ";
    else result += ones[th] + " " + getThousandForm(th) + " ";
  }
  if (h > 0) result += hundreds[h] + " ";
  if (t === 1) result += teens[o] + " ";
  else {
    if (t > 0) result += tens[t] + " ";
    if (o > 0) result += ones[o] + " ";
  }

  return result.trim();
};

// Decorative components from WelcomePack style
const GradientOrbs = () => (
  <>
    <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-transparent blur-[80px]" />
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent blur-[80px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-pink-500/5 blur-[60px]" />
  </>
);

const FloatingShapes = () => (
  <>
    <div className="absolute top-8 right-16 w-16 h-16 border border-pink-500/20 rounded-full" />
    <div className="absolute top-24 right-8 w-6 h-6 bg-pink-500/10 rounded-lg rotate-45" />
    <div className="absolute bottom-32 left-12 w-12 h-12 border border-fuchsia-500/15 rounded-xl rotate-12" />
    <div className="absolute bottom-20 right-24 w-4 h-4 bg-pink-400/20 rounded-full" />
  </>
);

const DecorativeLines = () => (
  <>
    <div className="absolute top-0 left-1/4 w-px h-24 bg-gradient-to-b from-pink-500/30 to-transparent" />
    <div className="absolute bottom-0 right-1/3 w-px h-20 bg-gradient-to-t from-fuchsia-500/20 to-transparent" />
  </>
);

const DotsPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute opacity-20 ${className}`}>
    <div className="grid grid-cols-4 gap-2">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-pink-400" />
      ))}
    </div>
  </div>
);

export const InvoicePreview = ({ data }: InvoicePreviewProps) => {
  const services = data.services || [];
  const totalAmount = services.reduce((sum, s) => sum + (parseFloat(s.price || "0") * s.quantity), 0);
  const advanceAmount = parseFloat(data.advanceAmount || "0");
  const finalAmount = data.invoiceType === "final" ? totalAmount - advanceAmount : totalAmount;
  
  const invoiceTitle = data.invoiceType === "advance" 
    ? "Faktura zaliczkowa" 
    : data.invoiceType === "final" 
      ? "Faktura końcowa" 
      : "Faktura";

  const zloteSlownie = numberToWords(Math.floor(finalAmount));
  const grosze = Math.round((finalAmount % 1) * 100);

  return (
    <div
      id="invoice-preview"
      className="w-[794px] min-h-[1123px] relative overflow-hidden"
      style={{ backgroundColor: '#09090b' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      <DecorativeLines />
      <DotsPattern className="top-16 right-6" />
      <DotsPattern className="bottom-40 left-6" />

      {/* Content */}
      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
              <img src={agencyLogo} alt="Aurine" className="relative w-12 h-12 object-contain" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{data.agencyName || "Aurine"}</p>
              <p className="text-sm text-zinc-500">{data.agencyOwner || "—"}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-2">
              <span className="text-pink-300 text-sm font-medium uppercase tracking-wider">{invoiceTitle}</span>
            </div>
            <p className="text-2xl font-bold text-white">{data.invoiceNumber || "—"}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-8 mb-6">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-zinc-800/40 border border-zinc-700/50 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <span className="text-pink-400 text-xs">📅</span>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Data wystawienia</p>
              <p className="text-white font-medium text-sm">{formatDate(data.issueDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-zinc-800/40 border border-zinc-700/50 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <span className="text-amber-400 text-xs">⏰</span>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Termin płatności</p>
              <p className="text-white font-medium text-sm">{formatDate(data.paymentDue)}</p>
            </div>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-fuchsia-500/50 rounded-xl blur-sm opacity-30" />
            <div className="relative bg-zinc-900 border border-pink-500/30 rounded-xl p-5">
              <p className="text-xs text-pink-400 uppercase tracking-wider font-semibold mb-3">Sprzedawca</p>
              <p className="text-base font-bold text-white">{data.agencyName || "Aurine"}</p>
              <p className="text-sm text-zinc-400 mt-1">{data.agencyOwner || "—"}</p>
              <p className="text-sm text-zinc-500 mt-2">{data.agencyAddress || "—"}</p>
              {data.agencyNIP && <p className="text-sm text-zinc-500 mt-1">NIP: {data.agencyNIP}</p>}
              <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 bg-pink-500/10 rounded-md">
                <span className="text-xs text-pink-400 font-medium">Zwolniony z VAT</span>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">Nabywca</p>
            <p className="text-base font-bold text-white">{data.clientName || "—"}</p>
            <p className="text-sm text-zinc-500 mt-2">{data.clientAddress || "—"}</p>
            {data.clientNIP && <p className="text-sm text-zinc-500 mt-1">NIP: {data.clientNIP}</p>}
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 px-5 py-3 border-b border-zinc-700/50">
            <div className="grid grid-cols-12 text-xs uppercase tracking-wider font-semibold text-pink-300">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Usługa</div>
              <div className="col-span-2 text-right">Ilość</div>
              <div className="col-span-2 text-right">Cena</div>
              <div className="col-span-2 text-right">Wartość</div>
            </div>
          </div>
          <div className="divide-y divide-zinc-700/30">
            {services.length > 0 ? services.map((service, index) => (
              <div key={service.id} className="grid grid-cols-12 px-5 py-3 text-sm hover:bg-zinc-700/10 transition-colors">
                <div className="col-span-1 text-zinc-600">{index + 1}</div>
                <div className="col-span-5 text-zinc-200">{service.description || "—"}</div>
                <div className="col-span-2 text-right text-zinc-500">{service.quantity}</div>
                <div className="col-span-2 text-right text-zinc-500">{formatAmount(service.price)} zł</div>
                <div className="col-span-2 text-right font-semibold text-white">
                  {formatAmount(parseFloat(service.price || "0") * service.quantity)} zł
                </div>
              </div>
            )) : (
              <div className="px-5 py-4 text-sm text-zinc-600 text-center">Brak usług</div>
            )}
            
            {data.invoiceType === "final" && advanceAmount > 0 && (
              <div className="grid grid-cols-12 px-5 py-3 text-sm bg-amber-500/5">
                <div className="col-span-1 text-zinc-600">—</div>
                <div className="col-span-5 text-amber-400">Zaliczka wpłacona</div>
                <div className="col-span-2 text-right text-zinc-600">1</div>
                <div className="col-span-2 text-right text-zinc-600">-{formatAmount(data.advanceAmount)} zł</div>
                <div className="col-span-2 text-right font-semibold text-amber-400">-{formatAmount(data.advanceAmount)} zł</div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-end mb-4">
          <div className="w-72">
            <div className="flex justify-between py-2 text-sm border-b border-zinc-700/50">
              <span className="text-zinc-500">Netto</span>
              <span className="text-zinc-300">{formatAmount(finalAmount)} zł</span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-zinc-700/50">
              <span className="text-zinc-500">VAT (zw.)</span>
              <span className="text-zinc-600">—</span>
            </div>
            <div className="relative mt-3 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-xl blur-sm opacity-50" />
              <div className="relative flex justify-between items-center py-3 px-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white rounded-xl">
                <span className="text-sm font-medium">Do zapłaty</span>
                <span className="text-xl font-bold">{formatAmount(finalAmount)} zł</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amount in words */}
        <div className="text-sm mb-4 px-4 py-2 bg-zinc-800/30 rounded-lg inline-block">
          <span className="text-zinc-500">Słownie: </span>
          <span className="text-zinc-300">{zloteSlownie} złotych {grosze}/100</span>
        </div>

        {/* Payment info */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 mb-4">
          <p className="text-xs text-pink-400 uppercase tracking-wider font-semibold mb-4">Dane do przelewu</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <span className="text-blue-400 text-sm">🏦</span>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Bank</p>
                <p className="text-white font-medium text-sm">{data.bankName || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm">💳</span>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Numer konta</p>
                <p className="text-white font-medium text-sm">{data.bankAccount || "—"}</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <span className="text-purple-400 text-sm">📝</span>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Tytuł przelewu</p>
              <p className="text-white font-medium text-sm">{data.invoiceNumber || "—"}</p>
            </div>
          </div>
        </div>

        {/* VAT notice */}
        <p className="text-xs text-zinc-600 text-center mb-6">
          Zwolnienie z VAT na podstawie art. 113 ust. 1 ustawy o podatku od towarów i usług
        </p>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-16">
          <div className="text-center">
            <div className="h-14 border-b-2 border-zinc-700 mb-2"></div>
            <p className="text-xs text-zinc-500">{data.agencyOwner || "Wystawił"}</p>
          </div>
          <div className="text-center">
            <div className="h-14 border-b-2 border-zinc-700 mb-2"></div>
            <p className="text-xs text-zinc-500">Odebrał</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <div className="flex items-center gap-2">
            <img src={agencyLogo} alt="Aurine" className="w-5 h-5 object-contain opacity-50" />
            <span className="text-zinc-600 text-xs">aurine.pl</span>
          </div>
          <p className="text-xs text-zinc-600">Marketing dla salonów beauty</p>
        </div>
      </div>
    </div>
  );
};
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
      className="w-[794px] min-h-[1123px] relative"
      style={{ backgroundColor: '#1f1f23' }}
    >
      {/* Pink accent bar */}
      <div className="h-2 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500" />
      
      {/* Header */}
      <div className="px-10 pt-8 pb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
          <div>
            <p className="text-xl font-bold text-white">{data.agencyName || "Aurine"}</p>
            <p className="text-xs text-zinc-400">{data.agencyOwner || "—"}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-light text-zinc-200">{invoiceTitle}</p>
          <p className="text-lg font-semibold text-pink-400 mt-1">{data.invoiceNumber || "—"}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-6 space-y-6">
        {/* Dates */}
        <div className="flex gap-12 text-sm">
          <div>
            <p className="text-xs text-pink-400 uppercase tracking-wider mb-1">Data wystawienia</p>
            <p className="text-zinc-200 font-medium">{formatDate(data.issueDate)}</p>
          </div>
          <div>
            <p className="text-xs text-pink-400 uppercase tracking-wider mb-1">Termin płatności</p>
            <p className="text-zinc-200 font-medium">{formatDate(data.paymentDue)}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-500/30 rounded-xl p-5">
            <p className="text-xs text-pink-400 uppercase tracking-wider font-semibold mb-3">Sprzedawca</p>
            <p className="text-sm font-bold text-white">{data.agencyName || "Aurine"}</p>
            <p className="text-sm text-zinc-300 mt-1">{data.agencyOwner || "—"}</p>
            <p className="text-sm text-zinc-400 mt-2">{data.agencyAddress || "—"}</p>
            {data.agencyNIP && <p className="text-sm text-zinc-400 mt-1">NIP: {data.agencyNIP}</p>}
            <p className="text-xs text-pink-400 mt-3 font-medium">Zwolniony z VAT</p>
          </div>
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">Nabywca</p>
            <p className="text-sm font-bold text-white">{data.clientName || "—"}</p>
            <p className="text-sm text-zinc-400 mt-2">{data.clientAddress || "—"}</p>
            {data.clientNIP && <p className="text-sm text-zinc-400 mt-1">NIP: {data.clientNIP}</p>}
          </div>
        </div>

        {/* Services Table */}
        <div className="border border-zinc-700 rounded-xl overflow-hidden">
          <div className="bg-pink-500/20 text-pink-300 px-5 py-3">
            <div className="grid grid-cols-12 text-xs uppercase tracking-wider font-medium">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Usługa</div>
              <div className="col-span-2 text-right">Ilość</div>
              <div className="col-span-2 text-right">Cena</div>
              <div className="col-span-2 text-right">Wartość</div>
            </div>
          </div>
          <div className="divide-y divide-zinc-700/50">
            {services.length > 0 ? services.map((service, index) => (
              <div key={service.id} className="grid grid-cols-12 px-5 py-4 text-sm">
                <div className="col-span-1 text-zinc-500">{index + 1}</div>
                <div className="col-span-5 text-zinc-200">{service.description || "—"}</div>
                <div className="col-span-2 text-right text-zinc-400">{service.quantity}</div>
                <div className="col-span-2 text-right text-zinc-400">{formatAmount(service.price)} zł</div>
                <div className="col-span-2 text-right font-semibold text-white">
                  {formatAmount(parseFloat(service.price || "0") * service.quantity)} zł
                </div>
              </div>
            )) : (
              <div className="px-5 py-4 text-sm text-zinc-500 text-center">Brak usług</div>
            )}
            
            {data.invoiceType === "final" && advanceAmount > 0 && (
              <div className="grid grid-cols-12 px-5 py-4 text-sm bg-amber-500/10">
                <div className="col-span-1 text-zinc-500">—</div>
                <div className="col-span-5 text-amber-400">Zaliczka wpłacona</div>
                <div className="col-span-2 text-right text-zinc-500">1</div>
                <div className="col-span-2 text-right text-zinc-500">-{formatAmount(data.advanceAmount)} zł</div>
                <div className="col-span-2 text-right font-semibold text-amber-400">-{formatAmount(data.advanceAmount)} zł</div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-72">
            <div className="flex justify-between py-2 text-sm border-b border-zinc-700">
              <span className="text-zinc-500">Netto</span>
              <span className="text-zinc-300">{formatAmount(finalAmount)} zł</span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-zinc-700">
              <span className="text-zinc-500">VAT (zw.)</span>
              <span className="text-zinc-600">—</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 mt-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl">
              <span className="text-sm font-medium">Do zapłaty</span>
              <span className="text-xl font-bold">{formatAmount(finalAmount)} zł</span>
            </div>
          </div>
        </div>

        {/* Amount in words */}
        <div className="text-sm">
          <span className="text-zinc-500">Słownie: </span>
          <span className="text-zinc-300">{zloteSlownie} złotych {grosze}/100</span>
        </div>

        {/* Payment info */}
        <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5">
          <p className="text-xs text-pink-400 uppercase tracking-wider font-semibold mb-4">Dane do przelewu</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Bank</p>
              <p className="text-zinc-200 font-medium">{data.bankName || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Numer konta</p>
              <p className="text-zinc-200 font-medium">{data.bankAccount || "—"}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Tytuł przelewu</p>
            <p className="text-zinc-200 font-medium text-sm">{data.invoiceNumber || "—"}</p>
          </div>
        </div>

        {/* VAT notice */}
        <p className="text-xs text-zinc-500 text-center">
          Zwolnienie z VAT na podstawie art. 113 ust. 1 ustawy o podatku od towarów i usług
        </p>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-20 pt-8">
          <div className="text-center">
            <div className="h-16 border-b-2 border-zinc-600 mb-2"></div>
            <p className="text-xs text-zinc-400">{data.agencyOwner || "Wystawił"}</p>
          </div>
          <div className="text-center">
            <div className="h-16 border-b-2 border-zinc-600 mb-2"></div>
            <p className="text-xs text-zinc-400">Odebrał</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-10 py-4 flex items-center justify-between border-t border-zinc-700">
        <div className="flex items-center gap-3">
          <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-60" />
          <span className="text-xs text-zinc-500">aurine.pl</span>
        </div>
        <p className="text-xs text-zinc-500">Marketing dla salonów beauty</p>
      </div>
    </div>
  );
};
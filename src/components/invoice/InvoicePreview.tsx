import agencyLogo from "@/assets/agency-logo.png";

interface InvoiceData {
  invoiceType: "advance" | "final" | "full";
  clientName: string;
  clientAddress: string;
  clientNIP: string;
  invoiceNumber: string;
  issueDate: string;
  serviceDescription: string;
  amount: string;
  advanceAmount: string;
  paymentDue: string;
  bankName: string;
  bankAccount: string;
}

interface InvoicePreviewProps {
  data: InvoiceData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
};

const formatAmount = (amount: string) => {
  if (!amount) return "0,00";
  const num = parseFloat(amount);
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
  const amount = parseFloat(data.amount || "0");
  const advanceAmount = parseFloat(data.advanceAmount || "0");
  const finalAmount = data.invoiceType === "final" ? amount - advanceAmount : amount;
  
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
      className="w-[794px] min-h-[1123px] text-white relative"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Header */}
      <div className="px-12 pt-10 pb-8 border-b border-zinc-800/50">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-11 h-11 object-contain" />
            <div>
              <p className="text-lg font-medium text-white">Aurine</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Agency</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-light text-white">{invoiceTitle}</p>
            <p className="text-base text-pink-400 mt-1 font-medium">{data.invoiceNumber || "—"}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-12 py-8 space-y-8">
        {/* Dates */}
        <div className="flex gap-16">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Data wystawienia</p>
            <p className="text-sm text-white">{formatDate(data.issueDate)}</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Termin płatności</p>
            <p className="text-sm text-white">{formatDate(data.paymentDue)}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] text-pink-400 uppercase tracking-widest mb-3">Sprzedawca</p>
            <p className="text-sm font-medium text-white">Aurine Agency</p>
            <p className="text-xs text-zinc-400 mt-1">ul. Przykładowa 123</p>
            <p className="text-xs text-zinc-400">00-000 Warszawa</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3">Nabywca</p>
            <p className="text-sm font-medium text-white">{data.clientName || "—"}</p>
            <p className="text-xs text-zinc-400 mt-1">{data.clientAddress || "—"}</p>
            {data.clientNIP && <p className="text-xs text-zinc-400">NIP: {data.clientNIP}</p>}
          </div>
        </div>

        {/* Table */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <div className="bg-zinc-900/50 px-5 py-3">
            <div className="grid grid-cols-12 text-[10px] text-zinc-500 uppercase tracking-widest">
              <div className="col-span-6">Usługa</div>
              <div className="col-span-2 text-right">Ilość</div>
              <div className="col-span-2 text-right">Cena</div>
              <div className="col-span-2 text-right">Wartość</div>
            </div>
          </div>
          
          <div className="px-5 py-4">
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-6 text-white">{data.serviceDescription || "Usługi marketingowe"}</div>
              <div className="col-span-2 text-right text-zinc-400">1</div>
              <div className="col-span-2 text-right text-zinc-400">{formatAmount(data.amount)} zł</div>
              <div className="col-span-2 text-right text-white font-medium">{formatAmount(data.amount)} zł</div>
            </div>
          </div>
          
          {data.invoiceType === "final" && advanceAmount > 0 && (
            <div className="px-5 py-4 border-t border-zinc-800">
              <div className="grid grid-cols-12 text-sm">
                <div className="col-span-6 text-zinc-400">Zaliczka wpłacona</div>
                <div className="col-span-2 text-right text-zinc-400">1</div>
                <div className="col-span-2 text-right text-zinc-400">-{formatAmount(data.advanceAmount)} zł</div>
                <div className="col-span-2 text-right text-zinc-400">-{formatAmount(data.advanceAmount)} zł</div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm py-1">
              <span className="text-zinc-500">Netto</span>
              <span className="text-white">{formatAmount(String(finalAmount))} zł</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-zinc-800">
              <span className="text-zinc-500">VAT (zw.)</span>
              <span className="text-zinc-500">—</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-white">Do zapłaty</span>
              <span className="text-xl font-semibold text-pink-400">{formatAmount(String(finalAmount))} zł</span>
            </div>
          </div>
        </div>

        {/* Amount in words */}
        <div className="text-xs text-zinc-500">
          Słownie: <span className="text-zinc-300">{zloteSlownie} złotych {grosze}/100</span>
        </div>

        {/* Payment info */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-5">
          <p className="text-[10px] text-pink-400 uppercase tracking-widest mb-4">Dane do przelewu</p>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Bank</p>
              <p className="text-white">{data.bankName || "—"}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Numer konta</p>
              <p className="text-white">{data.bankAccount || "—"}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Tytuł przelewu</p>
            <p className="text-white text-sm">{data.invoiceNumber || "—"}</p>
          </div>
        </div>

        {/* VAT notice */}
        <p className="text-[10px] text-zinc-600 text-center">
          Zwolnienie z VAT na podstawie art. 113 ust. 1 ustawy o podatku od towarów i usług
        </p>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-24 pt-8">
          <div className="text-center">
            <div className="border-t border-zinc-700 pt-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Wystawił</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-zinc-700 pt-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Odebrał</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-12 py-4 border-t border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-50" />
          <span className="text-[10px] text-zinc-600">aurine.pl</span>
        </div>
        <p className="text-[9px] text-zinc-600">Marketing dla salonów beauty</p>
      </div>
    </div>
  );
};

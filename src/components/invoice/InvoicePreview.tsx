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
      className="w-[794px] min-h-[1123px] bg-white text-zinc-900 p-12"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-12">
        <div className="flex items-center gap-4">
          <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-xl font-semibold text-zinc-900">Aurine</p>
            <p className="text-xs text-zinc-500">Marketing dla beauty</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-light text-zinc-900">{invoiceTitle}</p>
          <p className="text-lg font-medium text-zinc-700 mt-1">{data.invoiceNumber || "—"}</p>
        </div>
      </div>

      {/* Dates Row */}
      <div className="flex gap-12 mb-10 text-sm">
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Data wystawienia</p>
          <p className="text-zinc-900">{formatDate(data.issueDate)}</p>
        </div>
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Termin płatności</p>
          <p className="text-zinc-900">{formatDate(data.paymentDue)}</p>
        </div>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-2 gap-12 mb-10">
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-wider mb-3">Sprzedawca</p>
          <p className="font-medium text-zinc-900">Aurine Agency</p>
          <p className="text-sm text-zinc-600 mt-1">ul. Przykładowa 123</p>
          <p className="text-sm text-zinc-600">00-000 Warszawa</p>
        </div>
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-wider mb-3">Nabywca</p>
          <p className="font-medium text-zinc-900">{data.clientName || "—"}</p>
          <p className="text-sm text-zinc-600 mt-1">{data.clientAddress || "—"}</p>
          {data.clientNIP && <p className="text-sm text-zinc-600">NIP: {data.clientNIP}</p>}
        </div>
      </div>

      {/* Services */}
      <div className="mb-10">
        <div className="border-b border-zinc-200 pb-2 mb-4">
          <div className="grid grid-cols-12 text-xs text-zinc-400 uppercase tracking-wider">
            <div className="col-span-6">Usługa</div>
            <div className="col-span-2 text-right">Ilość</div>
            <div className="col-span-2 text-right">Cena</div>
            <div className="col-span-2 text-right">Wartość</div>
          </div>
        </div>
        
        <div className="grid grid-cols-12 py-3 text-sm">
          <div className="col-span-6 text-zinc-900">{data.serviceDescription || "Usługi marketingowe"}</div>
          <div className="col-span-2 text-right text-zinc-600">1</div>
          <div className="col-span-2 text-right text-zinc-600">{formatAmount(data.amount)} zł</div>
          <div className="col-span-2 text-right font-medium text-zinc-900">{formatAmount(data.amount)} zł</div>
        </div>
        
        {data.invoiceType === "final" && advanceAmount > 0 && (
          <div className="grid grid-cols-12 py-3 text-sm border-t border-zinc-100">
            <div className="col-span-6 text-zinc-600">Zaliczka wpłacona</div>
            <div className="col-span-2 text-right text-zinc-600">1</div>
            <div className="col-span-2 text-right text-zinc-600">-{formatAmount(data.advanceAmount)} zł</div>
            <div className="col-span-2 text-right font-medium text-zinc-600">-{formatAmount(data.advanceAmount)} zł</div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="flex justify-end mb-10">
        <div className="w-64">
          <div className="flex justify-between py-2 text-sm">
            <span className="text-zinc-500">Netto</span>
            <span className="text-zinc-900">{formatAmount(String(finalAmount))} zł</span>
          </div>
          <div className="flex justify-between py-2 text-sm border-b border-zinc-200">
            <span className="text-zinc-500">VAT (zw.)</span>
            <span className="text-zinc-500">—</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-medium text-zinc-900">Do zapłaty</span>
            <span className="text-xl font-semibold text-zinc-900">{formatAmount(String(finalAmount))} zł</span>
          </div>
        </div>
      </div>

      {/* Amount in words */}
      <div className="mb-10 text-sm">
        <span className="text-zinc-400">Słownie: </span>
        <span className="text-zinc-700">{zloteSlownie} złotych {grosze}/100</span>
      </div>

      {/* Payment info */}
      <div className="bg-zinc-50 rounded-lg p-5 mb-10">
        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-3">Dane do przelewu</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-zinc-500">Bank</p>
            <p className="text-zinc-900 font-medium">{data.bankName || "mBank"}</p>
          </div>
          <div>
            <p className="text-zinc-500">Numer konta</p>
            <p className="text-zinc-900 font-medium">{data.bankAccount || "00 0000 0000 0000 0000 0000 0000"}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-zinc-500 text-sm">Tytuł</p>
          <p className="text-zinc-900 font-medium text-sm">{data.invoiceNumber || "—"}</p>
        </div>
      </div>

      {/* VAT notice */}
      <p className="text-xs text-zinc-400 text-center mb-16">
        Zwolnienie z VAT na podstawie art. 113 ust. 1 ustawy o podatku od towarów i usług
      </p>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-24 mt-auto">
        <div className="text-center">
          <div className="border-t border-zinc-300 pt-2">
            <p className="text-xs text-zinc-400">Wystawił</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-zinc-300 pt-2">
            <p className="text-xs text-zinc-400">Odebrał</p>
          </div>
        </div>
      </div>
    </div>
  );
};

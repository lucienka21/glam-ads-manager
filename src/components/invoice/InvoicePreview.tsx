import { Building2, FileText, Calendar, CreditCard, User, Sparkles, Flower2 } from "lucide-react";
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
    ? "FAKTURA ZALICZKOWA" 
    : data.invoiceType === "final" 
      ? "FAKTURA KOŃCOWA" 
      : "FAKTURA";

  const zloteSlownie = numberToWords(Math.floor(finalAmount));
  const grosze = Math.round((finalAmount % 1) * 100);

  return (
    <div
      id="invoice-preview"
      className="w-[794px] min-h-[1123px] bg-black text-white overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-black p-6 border-b border-pink-900/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={agencyLogo} 
              alt="Aurine" 
              className="w-14 h-14 object-contain"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-light">
                Aurine Agency
              </p>
              <p className="text-lg font-semibold text-white">
                {invoiceTitle}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex flex-col items-end gap-1 px-5 py-3 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 shadow-xl shadow-pink-500/25">
              <span className="text-[9px] uppercase tracking-[0.25em] text-pink-100 font-light">
                Numer faktury
              </span>
              <p className="text-lg font-bold text-white">
                {data.invoiceNumber || "FV/____/____"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-5">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Data wystawienia</span>
            </div>
            <p className="text-lg font-semibold text-white ml-11">{formatDate(data.issueDate)}</p>
          </div>
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Termin płatności</span>
            </div>
            <p className="text-lg font-semibold text-white ml-11">{formatDate(data.paymentDue)}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-pink-950/30 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-pink-800/20 p-4 backdrop-blur shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-pink-300 font-medium">Sprzedawca</p>
                <h4 className="text-sm font-semibold text-white">Aurine Agency</h4>
              </div>
            </div>
            <div className="space-y-1 text-[10px] text-zinc-400 ml-12">
              <p>ul. Przykładowa 123</p>
              <p>00-000 Warszawa</p>
              <p className="text-pink-300 font-medium mt-2">Zwolnione z VAT</p>
              <p className="text-zinc-500 text-[9px]">na podstawie art. 113 ust. 1 ustawy o VAT</p>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Nabywca</p>
                <h4 className="text-sm font-semibold text-white">{data.clientName || "Nazwa klienta"}</h4>
              </div>
            </div>
            <div className="space-y-1 text-[10px] text-zinc-400 ml-12">
              <p>{data.clientAddress || "Adres klienta"}</p>
              {data.clientNIP && <p className="text-zinc-300 mt-2">NIP: {data.clientNIP}</p>}
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-zinc-950/80 rounded-2xl border border-zinc-800/50 overflow-hidden">
          <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 px-5 py-3">
            <div className="grid grid-cols-12 gap-2 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              <div className="col-span-1">Lp.</div>
              <div className="col-span-5">Nazwa usługi</div>
              <div className="col-span-2 text-right">Ilość</div>
              <div className="col-span-2 text-right">Cena jedn.</div>
              <div className="col-span-2 text-right">Wartość</div>
            </div>
          </div>
          <div className="divide-y divide-zinc-800/50">
            <div className="grid grid-cols-12 gap-2 px-5 py-4 text-sm">
              <div className="col-span-1 text-zinc-500 text-sm">1</div>
              <div className="col-span-5 font-medium text-white text-sm">{data.serviceDescription || "Usługi marketingowe Facebook Ads"}</div>
              <div className="col-span-2 text-right text-zinc-400 text-sm">1 szt.</div>
              <div className="col-span-2 text-right text-zinc-400 text-sm">{formatAmount(data.amount)} PLN</div>
              <div className="col-span-2 text-right font-bold text-white text-sm">{formatAmount(data.amount)} PLN</div>
            </div>
            
            {data.invoiceType === "final" && advanceAmount > 0 && (
              <div className="grid grid-cols-12 gap-2 px-5 py-4 bg-amber-950/20">
                <div className="col-span-1 text-zinc-500 text-sm">2</div>
                <div className="col-span-5 font-medium text-amber-300 text-sm">Zaliczka wpłacona</div>
                <div className="col-span-2 text-right text-zinc-400 text-sm">1 szt.</div>
                <div className="col-span-2 text-right text-zinc-400 text-sm">-{formatAmount(data.advanceAmount)} PLN</div>
                <div className="col-span-2 text-right font-bold text-amber-300 text-sm">-{formatAmount(data.advanceAmount)} PLN</div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-80 space-y-2">
            <div className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-500 text-sm">Wartość netto</span>
              <span className="font-medium text-white">{formatAmount(String(finalAmount))} PLN</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-500 text-sm">VAT (zw.)</span>
              <span className="font-medium text-zinc-400">0,00 PLN</span>
            </div>
            <div className="flex justify-between items-center py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl px-5 shadow-xl shadow-pink-500/25">
              <span className="font-bold text-sm uppercase tracking-wide">Do zapłaty</span>
              <span className="font-bold text-2xl">{formatAmount(String(finalAmount))} PLN</span>
            </div>
          </div>
        </div>

        {/* Amount in words */}
        <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-4">
          <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Kwota słownie</p>
          <p className="font-medium text-white">{zloteSlownie} złotych {grosze}/100</p>
        </div>

        {/* Payment info */}
        <div className="bg-gradient-to-br from-emerald-950/30 via-zinc-950/60 to-zinc-950/50 rounded-2xl border border-emerald-800/30 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">Dane do przelewu</p>
          </div>
          <div className="grid grid-cols-2 gap-4 ml-11">
            <div>
              <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Bank</p>
              <p className="font-medium text-white text-sm">mBank</p>
            </div>
            <div>
              <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Numer konta</p>
              <p className="font-medium text-white text-sm">00 1140 0000 0000 0000 0000 0000</p>
            </div>
          </div>
          <div className="mt-3 ml-11">
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Tytuł przelewu</p>
            <p className="font-medium text-white text-sm">{data.invoiceNumber || "FV/____/____"}</p>
          </div>
        </div>

        {/* VAT exempt notice */}
        <div className="bg-gradient-to-br from-pink-950/20 to-zinc-950/50 rounded-xl border border-pink-800/20 p-4 text-center">
          <p className="text-xs text-pink-300 font-medium">Zwolnione z VAT</p>
          <p className="text-[10px] text-zinc-500 mt-1">na podstawie art. 113 ust. 1 ustawy o podatku od towarów i usług</p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="text-center">
            <div className="h-12 border-b border-zinc-700 mb-2"></div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Podpis wystawcy</p>
          </div>
          <div className="text-center">
            <div className="h-12 border-b border-zinc-700 mb-2"></div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Podpis odbiorcy</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-zinc-900 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <img src={agencyLogo} alt="Aurine" className="w-7 h-7 object-contain opacity-60" />
          <div className="flex items-center gap-2">
            <Flower2 className="w-3 h-3 text-pink-500/50" />
            <span className="text-[9px] text-zinc-600">aurine.pl</span>
          </div>
        </div>
        <p className="text-[8px] text-zinc-600">
          Profesjonalny marketing dla salonów beauty
        </p>
      </div>
    </div>
  );
};

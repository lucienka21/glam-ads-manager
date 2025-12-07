import { FileText, Building2, User, CreditCard, Shield, Clock, AlertTriangle, Scale } from "lucide-react";
import agencyLogo from "@/assets/agency-logo.png";

interface ServiceItem {
  id: string;
  name: string;
}

interface ContractData {
  clientName: string;
  clientAddress: string;
  clientNip: string;
  clientOwnerName: string;
  clientEmail: string;
  clientPhone: string;
  signDate: string;
  signCity: string;
  contractValue: string;
  paymentType: "full" | "split";
  advanceAmount: string;
  agencyName: string;
  agencyOwnerName: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyAddress: string;
  agencyNip: string;
  services: ServiceItem[];
}

interface ContractPreviewProps {
  data: ContractData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "........................";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
};

const formatAmount = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num) || num === 0) return "............";
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " PLN";
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  const totalValue = parseFloat(data.contractValue) || 0;
  const advanceValue = data.paymentType === "split" ? (parseFloat(data.advanceAmount) || 0) : 0;
  const remainingValue = data.paymentType === "split" ? Math.max(0, totalValue - advanceValue) : 0;

  const defaultServices = [
    "Tworzenie i prowadzenie kampanii Facebook Ads",
    "Przygotowanie materiałów reklamowych",
    "Optymalizacja i monitorowanie wyników",
    "Raporty miesięczne",
    "Doradztwo marketingowe"
  ];

  const servicesList = data.services?.length > 0 
    ? data.services.map(s => s.name)
    : defaultServices;

  return (
    <div
      id="contract-preview"
      className="w-[794px] bg-black text-white overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Header - identical style to ReportPreview */}
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
                Umowa o Świadczenie Usług
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex flex-col items-end gap-1 px-5 py-3 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 shadow-xl shadow-pink-500/25">
              <span className="text-[9px] uppercase tracking-[0.25em] text-pink-100 font-light">
                Wartość
              </span>
              <p className="text-2xl font-bold text-white">
                {formatAmount(totalValue)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {data.clientName || "Nazwa Klienta"}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {data.signCity || "Miasto"} • {formatDate(data.signDate)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-4">
        {/* Parties Cards - 2 columns */}
        <div className="grid grid-cols-2 gap-3">
          {/* Zleceniodawca */}
          <div className="bg-gradient-to-br from-blue-950/30 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-blue-800/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-blue-300">Zleceniodawca</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-white mb-1">{data.clientName || "................................"}</p>
            <p className="text-[11px] text-zinc-400 mb-2">{data.clientOwnerName || "Imię i Nazwisko właściciela"}</p>
            <div className="text-[10px] text-zinc-500 space-y-0.5">
              <p>{data.clientAddress || "Adres"}</p>
              {data.clientNip && <p>NIP: {data.clientNip}</p>}
              {data.clientEmail && <p>{data.clientEmail}</p>}
              {data.clientPhone && <p>tel. {data.clientPhone}</p>}
            </div>
          </div>

          {/* Wykonawca */}
          <div className="bg-gradient-to-br from-pink-950/30 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-pink-800/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-pink-300">Wykonawca</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-white mb-1">{data.agencyName || "Agencja Marketingowa Aurine"}</p>
            <p className="text-[11px] text-zinc-400 mb-2">{data.agencyOwnerName}</p>
            <div className="text-[10px] text-zinc-500 space-y-0.5">
              <p>{data.agencyAddress}</p>
              {data.agencyNip && <p>NIP: {data.agencyNip}</p>}
              {data.agencyEmail && <p>{data.agencyEmail}</p>}
              {data.agencyPhone && <p>tel. {data.agencyPhone}</p>}
            </div>
          </div>
        </div>

        {/* §1 Przedmiot umowy */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 px-2 py-1 rounded-lg">
              <span className="text-[10px] font-bold text-white">§1</span>
            </div>
            <p className="text-[11px] font-semibold text-white">Przedmiot umowy</p>
          </div>
          <div className="text-[10px] text-zinc-400 space-y-2">
            <p>1. Przedmiotem umowy jest świadczenie usług marketingowych online:</p>
            <div className="pl-3 space-y-1">
              {servicesList.map((service, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span>{service}</span>
                </div>
              ))}
            </div>
            <p>2. Usługi świadczone na podstawie materiałów i dostępów od Zleceniodawcy.</p>
            <p>3. Wykonawca realizuje zadania z należytą starannością zgodnie z najlepszą praktyką marketingową.</p>
          </div>
        </div>

        {/* §2 & §3 Obowiązki - 2 columns */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-emerald-500 px-2 py-0.5 rounded">
                <span className="text-[9px] font-bold text-white">§2</span>
              </div>
              <p className="text-[10px] font-semibold text-white">Obowiązki Wykonawcy</p>
            </div>
            <div className="text-[9px] text-zinc-500 space-y-1">
              <p>• Prowadzenie kampanii zgodnie z celami</p>
              <p>• Przygotowywanie kreacji reklamowych</p>
              <p>• Optymalizacja ustawień kampanii</p>
              <p>• Raport wyników do 7. dnia miesiąca</p>
              <p>• Konsultacje i rekomendacje</p>
              <p>• Zachowanie poufności</p>
            </div>
          </div>

          <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-500 px-2 py-0.5 rounded">
                <span className="text-[9px] font-bold text-white">§3</span>
              </div>
              <p className="text-[10px] font-semibold text-white">Obowiązki Zleceniodawcy</p>
            </div>
            <div className="text-[9px] text-zinc-500 space-y-1">
              <p>• Dostęp do fanpage i konta reklamowego</p>
              <p>• Przekazanie materiałów (zdjęcia, logo)</p>
              <p>• Akceptacja kreacji w 3 dni robocze</p>
              <p>• Informowanie o zmianach w ofercie</p>
              <p>• Terminowe regulowanie płatności</p>
            </div>
          </div>
        </div>

        {/* §4 Wynagrodzenie - highlighted */}
        <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 rounded-2xl border border-pink-500/30 p-4 shadow-lg shadow-pink-500/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white">§4 Wynagrodzenie</p>
                <p className="text-[9px] text-pink-300">Warunki płatności</p>
              </div>
            </div>
          </div>

          {data.paymentType === "split" ? (
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-[8px] text-zinc-500 uppercase mb-1">Zaliczka (50%)</p>
                <p className="text-lg font-bold text-white">{formatAmount(advanceValue)}</p>
                <p className="text-[8px] text-zinc-500">w 3 dni od zawarcia</p>
              </div>
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-[8px] text-zinc-500 uppercase mb-1">Pozostała część (50%)</p>
                <p className="text-lg font-bold text-white">{formatAmount(remainingValue)}</p>
                <p className="text-[8px] text-zinc-500">7 dni po zakończeniu</p>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 rounded-xl p-3 text-center mb-3">
              <p className="text-[8px] text-zinc-500 uppercase mb-1">Płatność jednorazowa</p>
              <p className="text-xl font-bold text-white">{formatAmount(totalValue)}</p>
              <p className="text-[8px] text-zinc-500">w ciągu 3 dni od zawarcia umowy</p>
            </div>
          )}

          <p className="text-[9px] text-zinc-500 italic">
            Budżet reklamowy Meta Ads finansowany przez Zleceniodawcę, nie stanowi wynagrodzenia Wykonawcy.
          </p>
        </div>

        {/* §5-8 Grid */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <p className="text-[9px] font-semibold text-purple-300">§5</p>
            </div>
            <p className="text-[8px] text-zinc-500 leading-relaxed">
              Prawa autorskie chronione. Licencja niewyłączna po płatności. Konto i wyniki - własność Zleceniodawcy.
            </p>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <p className="text-[9px] font-semibold text-amber-300">§6</p>
            </div>
            <p className="text-[8px] text-zinc-500 leading-relaxed">
              Obowiązuje od wpłaty zaliczki. Przedłużenie za zgodą stron. 30-dniowy okres wypowiedzenia.
            </p>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
              <p className="text-[9px] font-semibold text-red-300">§7</p>
            </div>
            <p className="text-[8px] text-zinc-500 leading-relaxed">
              Rozwiązanie przy rażącym naruszeniu. Opóźnienie płatności &gt;14 dni. Forma pisemna/elektroniczna.
            </p>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Scale className="w-3 h-3 text-white" />
              </div>
              <p className="text-[9px] font-semibold text-teal-300">§8</p>
            </div>
            <p className="text-[8px] text-zinc-500 leading-relaxed">
              Zastosowanie K.C. Forma elektroniczna wiążąca. Zgodność z RODO.
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-4">
          <div className="text-center">
            <div className="h-12 border-b border-zinc-700 mb-2"></div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Zleceniodawca</p>
            <p className="text-[11px] text-zinc-400">{data.clientOwnerName || data.clientName || ""}</p>
          </div>
          <div className="text-center">
            <div className="h-12 border-b border-zinc-700 mb-2"></div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Wykonawca</p>
            <p className="text-[11px] text-zinc-400">{data.agencyOwnerName || ""}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={agencyLogo} 
            alt="Aurine" 
            className="w-6 h-6 object-contain opacity-60"
          />
          <span className="text-[10px] text-zinc-600">Aurine Agency</span>
        </div>
        <span className="text-[10px] text-zinc-600">
          aurine.pl • Marketing dla branży beauty
        </span>
      </div>
    </div>
  );
};

export default ContractPreview;

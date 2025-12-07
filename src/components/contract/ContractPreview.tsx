import { Building2, User, CreditCard, Shield, Clock, AlertTriangle, Scale } from "lucide-react";
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
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " zł";
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  const totalValue = parseFloat(data.contractValue) || 0;
  const advanceValue = data.paymentType === "split" ? (parseFloat(data.advanceAmount) || 0) : 0;
  const remainingValue = data.paymentType === "split" ? Math.max(0, totalValue - advanceValue) : 0;

  return (
    <div
      id="contract-preview"
      className="w-[794px] bg-black text-white overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Header - compact */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-black px-5 py-4 border-b border-pink-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
            <div>
              <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-500">Aurine Agency</p>
              <p className="text-sm font-semibold text-white">Umowa o Świadczenie Usług Marketingowych</p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-gradient-to-br from-pink-600 to-rose-700 shadow-lg shadow-pink-500/20">
            <p className="text-[8px] uppercase text-pink-100">Wartość</p>
            <p className="text-lg font-bold text-white">{formatAmount(totalValue)}</p>
          </div>
        </div>
        <p className="text-[9px] text-zinc-500 mt-2">
          zawarta w dniu <span className="text-zinc-300">{formatDate(data.signDate)}</span> w miejscowości <span className="text-zinc-300">{data.signCity || "........"}</span> pomiędzy:
        </p>
      </div>

      {/* Main Content - compact */}
      <div className="px-5 py-3 space-y-2">
        {/* Parties - 2 columns compact */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-blue-950/30 to-zinc-950/50 rounded-xl border border-blue-800/20 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-6 h-6 rounded-lg flex items-center justify-center">
                <Building2 className="w-3 h-3 text-white" />
              </div>
              <p className="text-[8px] uppercase tracking-wider text-blue-300">Zleceniodawca</p>
            </div>
            <p className="text-[11px] font-semibold text-white">{data.clientName || "................................"}</p>
            <p className="text-[9px] text-zinc-400">{data.clientOwnerName}</p>
            <div className="text-[8px] text-zinc-500 mt-1">
              <p>{data.clientAddress}</p>
              {data.clientNip && <p>NIP: {data.clientNip}</p>}
              {data.clientEmail && <p>{data.clientEmail}</p>}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-950/30 to-zinc-950/50 rounded-xl border border-pink-800/20 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-6 h-6 rounded-lg flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <p className="text-[8px] uppercase tracking-wider text-pink-300">Wykonawca</p>
            </div>
            <p className="text-[11px] font-semibold text-white">{data.agencyName || "Agencja Marketingowa Aurine"}</p>
            <p className="text-[9px] text-zinc-400">{data.agencyOwnerName}</p>
            <div className="text-[8px] text-zinc-500 mt-1">
              <p>{data.agencyAddress}</p>
              {data.agencyNip && <p>NIP: {data.agencyNip}</p>}
              {data.agencyEmail && <p>{data.agencyEmail}</p>}
            </div>
          </div>
        </div>

        {/* §1 Przedmiot umowy - compact */}
        <div className="bg-zinc-950 rounded-xl border border-zinc-800/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 px-1.5 py-0.5 rounded">
              <span className="text-[8px] font-bold text-white">§1</span>
            </div>
            <p className="text-[9px] font-semibold text-white">Przedmiot umowy</p>
          </div>
          <div className="text-[8px] text-zinc-400 space-y-1">
            <p>1. Przedmiotem umowy jest świadczenie usług marketingowych online: <span className="text-pink-400">a)</span> prowadzenie kampanii Facebook Ads, <span className="text-pink-400">b)</span> przygotowanie materiałów reklamowych (grafiki, treści, wideo), <span className="text-pink-400">c)</span> optymalizacja i monitorowanie wyników, <span className="text-pink-400">d)</span> sporządzanie raportów, <span className="text-pink-400">e)</span> doradztwo marketingowe.</p>
            <p>2. Usługi świadczone w oparciu o materiały i dostępy od Zleceniodawcy. 3. Wykonawca realizuje zadania z należytą starannością.</p>
          </div>
        </div>

        {/* §2 & §3 - compact 2 columns */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-zinc-950/50 rounded-lg border border-zinc-800/30 p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="bg-emerald-500 px-1.5 py-0.5 rounded">
                <span className="text-[7px] font-bold text-white">§2</span>
              </div>
              <p className="text-[8px] font-semibold text-white">Obowiązki Wykonawcy</p>
            </div>
            <div className="text-[7px] text-zinc-500 leading-tight">
              <p>1. Prowadzenie kampanii zgodnie z celami, przygotowywanie kreacji, optymalizacja ustawień, raport wyników do 7. dnia miesiąca, konsultacje. 2. Może korzystać z podwykonawców. 3. Nie gwarantuje określonych wyników finansowych. 4. Zachowuje poufność informacji.</p>
            </div>
          </div>

          <div className="bg-zinc-950/50 rounded-lg border border-zinc-800/30 p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="bg-purple-500 px-1.5 py-0.5 rounded">
                <span className="text-[7px] font-bold text-white">§3</span>
              </div>
              <p className="text-[8px] font-semibold text-white">Obowiązki Zleceniodawcy</p>
            </div>
            <div className="text-[7px] text-zinc-500 leading-tight">
              <p>1. Udostępnienie dostępu do fanpage i konta Meta Ads, przekazanie materiałów, akceptacja kreacji w 3 dni robocze (brak odpowiedzi = akceptacja), informowanie o zmianach, terminowe płatności. 2. Odpowiedzialność za zgodność materiałów z prawem.</p>
            </div>
          </div>
        </div>

        {/* §4 Wynagrodzenie - compact */}
        <div className="bg-gradient-to-br from-pink-600/15 to-rose-600/15 rounded-xl border border-pink-500/20 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-6 h-6 rounded-lg flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-white" />
            </div>
            <p className="text-[9px] font-semibold text-white">§4 Wynagrodzenie</p>
          </div>

          {data.paymentType === "split" ? (
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-black/30 rounded-lg p-2 text-center">
                <p className="text-[7px] text-zinc-500 uppercase">Zaliczka (50%)</p>
                <p className="text-sm font-bold text-white">{formatAmount(advanceValue)}</p>
                <p className="text-[6px] text-zinc-500">3 dni od umowy</p>
              </div>
              <div className="bg-black/30 rounded-lg p-2 text-center">
                <p className="text-[7px] text-zinc-500 uppercase">Pozostała część</p>
                <p className="text-sm font-bold text-white">{formatAmount(remainingValue)}</p>
                <p className="text-[6px] text-zinc-500">7 dni po zakończeniu</p>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 rounded-lg p-2 text-center mb-2">
              <p className="text-[7px] text-zinc-500 uppercase">Płatność jednorazowa</p>
              <p className="text-lg font-bold text-white">{formatAmount(totalValue)}</p>
              <p className="text-[6px] text-zinc-500">3 dni od otrzymania umowy</p>
            </div>
          )}

          <p className="text-[7px] text-zinc-500">
            Opóźnienie = wstrzymanie usług. Budżet Meta Ads pokrywa Zleceniodawca (nie jest częścią wynagrodzenia).
          </p>
        </div>

        {/* §5-8 Grid - very compact */}
        <div className="grid grid-cols-4 gap-1.5">
          <div className="bg-zinc-900/50 rounded-lg p-2 border border-zinc-800/50">
            <div className="flex items-center gap-1 mb-1">
              <Shield className="w-3 h-3 text-purple-400" />
              <p className="text-[7px] font-semibold text-purple-300">§5</p>
            </div>
            <p className="text-[6px] text-zinc-500 leading-tight">
              Materiały chronione prawem autorskim. Licencja niewyłączna po pełnej płatności. Zakaz odsprzedaży. Wykonawca może używać jako portfolio.
            </p>
          </div>

          <div className="bg-zinc-900/50 rounded-lg p-2 border border-zinc-800/50">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <p className="text-[7px] font-semibold text-amber-300">§6</p>
            </div>
            <p className="text-[6px] text-zinc-500 leading-tight">
              Obowiązuje od wpłaty zaliczki. Przedłużenie za zgodą stron (aneks/mail). Rażące naruszenie = natychmiastowe rozwiązanie.
            </p>
          </div>

          <div className="bg-zinc-900/50 rounded-lg p-2 border border-zinc-800/50">
            <div className="flex items-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <p className="text-[7px] font-semibold text-red-300">§7</p>
            </div>
            <p className="text-[6px] text-zinc-500 leading-tight">
              Rozwiązanie wg §6. Opóźnienie płatności &gt;14 dni lub brak materiałów = natychmiastowe rozwiązanie. Forma pisemna/elektroniczna.
            </p>
          </div>

          <div className="bg-zinc-900/50 rounded-lg p-2 border border-zinc-800/50">
            <div className="flex items-center gap-1 mb-1">
              <Scale className="w-3 h-3 text-teal-400" />
              <p className="text-[7px] font-semibold text-teal-300">§8</p>
            </div>
            <p className="text-[6px] text-zinc-500 leading-tight">
              Zastosowanie Kodeksu cywilnego. Forma elektroniczna (PDF) wystarczająca do ważności umowy.
            </p>
          </div>
        </div>

        {/* Signatures - compact */}
        <div className="grid grid-cols-2 gap-6 pt-2">
          <div className="text-center">
            <div className="h-8 border-b border-zinc-700 mb-1"></div>
            <p className="text-[8px] text-zinc-500 uppercase">Zleceniodawca</p>
          </div>
          <div className="text-center">
            <div className="h-8 border-b border-zinc-700 mb-1"></div>
            <p className="text-[8px] text-zinc-500 uppercase">Agencja marketingowa Aurine</p>
          </div>
        </div>
      </div>

      {/* Footer - minimal */}
      <div className="px-5 py-2 border-t border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={agencyLogo} alt="Aurine" className="w-4 h-4 object-contain opacity-50" />
          <span className="text-[8px] text-zinc-600">Aurine Agency</span>
        </div>
        <span className="text-[8px] text-zinc-600">aurine.pl</span>
      </div>
    </div>
  );
};

export default ContractPreview;

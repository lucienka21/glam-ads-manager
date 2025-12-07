import { FileText, Calendar, User, Building2, Shield, CheckCircle2, Sparkles, Flower2 } from "lucide-react";
import agencyLogo from "@/assets/agency-logo.png";

interface ContractData {
  clientName: string;
  clientAddress: string;
  signDate: string;
  signCity: string;
  contractValue: string;
  agencyEmail: string;
  agencyAddress: string;
}

interface ContractPreviewProps {
  data: ContractData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
};

const formatAmount = (amount: string) => {
  if (!amount) return "0,00";
  const num = parseFloat(amount);
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  return (
    <div
      id="contract-preview"
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
                Umowa Współpracy
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex flex-col items-end gap-1 px-5 py-3 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 shadow-xl shadow-pink-500/25">
              <span className="text-[9px] uppercase tracking-[0.25em] text-pink-100 font-light">
                Data zawarcia
              </span>
              <p className="text-lg font-bold text-white">
                {formatDate(data.signDate)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-zinc-400">
            Miejscowość: <span className="text-white font-medium">{data.signCity || "—"}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-4">
        {/* Parties Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-pink-950/30 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-pink-800/20 p-4 backdrop-blur shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-pink-300 font-medium">Wykonawca</p>
                <h4 className="text-sm font-semibold text-white">Aurine Agency</h4>
              </div>
            </div>
            <div className="space-y-1 text-[10px] text-zinc-400">
              <p>{data.agencyAddress || "Adres do korespondencji"}</p>
              <p>E-mail: {data.agencyEmail || "kontakt@aurine.pl"}</p>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium">Zleceniodawca</p>
                <h4 className="text-sm font-semibold text-white">{data.clientName || "Nazwa klienta"}</h4>
              </div>
            </div>
            <div className="space-y-1 text-[10px] text-zinc-400">
              <p>{data.clientAddress || "Adres klienta"}</p>
            </div>
          </div>
        </div>

        {/* Contract Value */}
        <div className="bg-gradient-to-br from-purple-950/30 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-purple-800/20 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-purple-300 font-medium">Wynagrodzenie miesięczne</p>
                <p className="text-zinc-400 text-[10px]">Płatne zgodnie z warunkami umowy</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{formatAmount(data.contractValue)} PLN</p>
              <p className="text-[10px] text-purple-300">brutto/miesiąc</p>
            </div>
          </div>
        </div>

        {/* Contract Paragraphs */}
        <div className="space-y-3">
          {/* §1 */}
          <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-3">
            <h3 className="text-pink-400 font-bold text-[11px] mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center text-[9px]">§1</span>
              Przedmiot umowy
            </h3>
            <div className="text-[9px] text-zinc-400 leading-relaxed space-y-1">
              <p>Przedmiotem umowy jest świadczenie usług marketingowych online:</p>
              <ul className="list-disc list-inside ml-2 space-y-0.5">
                <li>Tworzenie i prowadzenie kampanii Facebook Ads</li>
                <li>Przygotowanie materiałów reklamowych</li>
                <li>Optymalizacja i raportowanie wyników</li>
                <li>Doradztwo marketingowe</li>
              </ul>
            </div>
          </div>

          {/* §2 & §3 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-3">
              <h3 className="text-pink-400 font-bold text-[11px] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center text-[9px]">§2</span>
                Obowiązki Wykonawcy
              </h3>
              <ul className="text-[9px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Prowadzenie kampanii zgodnie z celami</li>
                <li>Przygotowywanie kreacji reklamowych</li>
                <li>Optymalizacja ustawień kampanii</li>
                <li>Miesięczne raporty do 7. dnia</li>
                <li>Zachowanie poufności</li>
              </ul>
            </div>

            <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-3">
              <h3 className="text-pink-400 font-bold text-[11px] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center text-[9px]">§3</span>
                Obowiązki Zleceniodawcy
              </h3>
              <ul className="text-[9px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Dostęp do fanpage i konta reklamowego</li>
                <li>Materiały (zdjęcia, opisy, logo)</li>
                <li>Akceptacja kreacji w 3 dni robocze</li>
                <li>Terminowe płatności</li>
              </ul>
            </div>
          </div>

          {/* §4 */}
          <div className="bg-gradient-to-br from-emerald-950/30 via-zinc-950/60 to-zinc-950/50 rounded-xl border border-emerald-800/30 p-3">
            <h3 className="text-emerald-400 font-bold text-[11px] mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[9px]">§4</span>
              Wynagrodzenie
            </h3>
            <div className="text-[9px] text-zinc-400 leading-relaxed space-y-1">
              <p><strong className="text-emerald-300">Zaliczka:</strong> 50% wynagrodzenia w terminie 3 dni od otrzymania umowy</p>
              <p><strong className="text-emerald-300">Pozostała część:</strong> 50% płatna w 7 dni od zakończenia miesiąca</p>
              <p className="text-zinc-500 mt-1">Budżet reklamowy finansowany przez Zleceniodawcę, nie jest częścią wynagrodzenia.</p>
            </div>
          </div>

          {/* §5 & §6 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-3">
              <h3 className="text-pink-400 font-bold text-[11px] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center text-[9px]">§5</span>
                Prawa autorskie
              </h3>
              <ul className="text-[9px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Materiały podlegają ochronie prawnoautorskiej</li>
                <li>Licencja niewyłączna po uregulowaniu płatności</li>
                <li>Wykonawca może używać w portfolio</li>
              </ul>
            </div>

            <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-3">
              <h3 className="text-pink-400 font-bold text-[11px] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center text-[9px]">§6</span>
                Okres obowiązywania
              </h3>
              <ul className="text-[9px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Od dnia wpłaty zaliczki</li>
                <li>Przedłużenie za zgodą obu stron</li>
                <li>Możliwość natychmiastowego rozwiązania</li>
              </ul>
            </div>
          </div>

          {/* §7 & §8 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-3">
              <h3 className="text-pink-400 font-bold text-[11px] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center text-[9px]">§7</span>
                Rozwiązanie umowy
              </h3>
              <ul className="text-[9px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Opóźnienie płatności &gt;14 dni</li>
                <li>Brak materiałów do kampanii</li>
                <li>Forma pisemna lub elektroniczna</li>
              </ul>
            </div>

            <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-3">
              <h3 className="text-pink-400 font-bold text-[11px] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center text-[9px]">§8</span>
                Postanowienia końcowe
              </h3>
              <ul className="text-[9px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Zastosowanie Kodeksu cywilnego</li>
                <li>Forma elektroniczna wystarczająca</li>
                <li>Przystąpienie = akceptacja</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-6 pt-4 mt-2">
          <div className="text-center">
            <div className="h-14 border-b border-zinc-700 mb-2"></div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Zleceniodawca</p>
            <p className="text-[10px] text-zinc-400 mt-1">{data.clientName || "—"}</p>
          </div>
          <div className="text-center">
            <div className="h-14 border-b border-zinc-700 mb-2"></div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Wykonawca</p>
            <p className="text-[10px] text-zinc-400 mt-1">Aurine Agency</p>
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

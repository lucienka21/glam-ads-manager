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
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " PLN";
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
                Umowa o Świadczenie Usług Marketingowych
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
          <p className="text-sm text-zinc-400">
            zawarta w dniu <span className="text-white">{formatDate(data.signDate)}</span> roku w miejscowości <span className="text-white">{data.signCity || "........................"}</span> pomiędzy:
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
              <p>adres: {data.clientAddress || "................................"}</p>
              {data.clientNip && <p>NIP: {data.clientNip}</p>}
              {data.clientEmail && <p>e-mail: {data.clientEmail}</p>}
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
              <p>adres do korespondencji: {data.agencyAddress}</p>
              {data.agencyNip && <p>NIP: {data.agencyNip}</p>}
              {data.agencyEmail && <p>e-mail: {data.agencyEmail}</p>}
              {data.agencyPhone && <p>tel. {data.agencyPhone}</p>}
            </div>
          </div>
        </div>

        {/* Intro text */}
        <p className="text-[10px] text-zinc-500 italic px-1">
          Strony oświadczają, że niniejsza umowa została zawarta w celu określenia zasad współpracy w zakresie świadczenia usług marketingowych przez Wykonawcę na rzecz Zleceniodawcy, w tym w szczególności świadczenia usług promocyjnych, reklamowych oraz doradztwa marketingowego.
        </p>

        {/* §1 Przedmiot umowy */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 px-2 py-1 rounded-lg">
              <span className="text-[10px] font-bold text-white">§1</span>
            </div>
            <p className="text-[11px] font-semibold text-white">Przedmiot umowy</p>
          </div>
          <div className="text-[10px] text-zinc-400 space-y-2">
            <p>1. Przedmiotem niniejszej umowy jest świadczenie przez Wykonawcę usług marketingowych online na rzecz Zleceniodawcy, w szczególności:</p>
            <div className="pl-4 space-y-1">
              <div className="flex items-start gap-2">
                <span className="text-pink-400">a)</span>
                <span>tworzenie, konfiguracja i prowadzenie kampanii reklamowych w systemie Facebook Ads,</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-400">b)</span>
                <span>przygotowanie i publikacja materiałów reklamowych (grafiki, treści, wideo),</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-400">c)</span>
                <span>bieżąca optymalizacja i monitorowanie wyników kampanii,</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-400">d)</span>
                <span>sporządzanie raportów z prowadzonych działań marketingowych,</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-400">e)</span>
                <span>doradztwo w zakresie działań reklamowych i komunikacji marketingowej.</span>
              </div>
            </div>
            <p>2. Usługi świadczone będą w oparciu o informacje, materiały i dostęp do kont reklamowych, które Zleceniodawca zobowiązuje się udostępnić Wykonawcy.</p>
            <p>3. Wykonawca zobowiązuje się realizować powierzone zadania z należytą starannością, zgodnie z najlepszą praktyką marketingową.</p>
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
              <p><span className="text-emerald-400">1.</span> Wykonawca zobowiązuje się do:</p>
              <p className="pl-2"><span className="text-emerald-400">a)</span> prowadzenia kampanii reklamowych zgodnie z celami ustalonymi ze Zleceniodawcą,</p>
              <p className="pl-2"><span className="text-emerald-400">b)</span> przygotowywania propozycji kreacji reklamowych (grafik, treści, wideo),</p>
              <p className="pl-2"><span className="text-emerald-400">c)</span> bieżącej optymalizacji ustawień kampanii, aby zwiększyć skuteczność działań,</p>
              <p className="pl-2"><span className="text-emerald-400">d)</span> przekazywania Zleceniodawcy raportu z wyników kampanii raz w miesiącu, nie później niż do 7. dnia roboczego następnego miesiąca,</p>
              <p className="pl-2"><span className="text-emerald-400">e)</span> udzielania konsultacji i rekomendacji dotyczących działań marketingowych online.</p>
              <p><span className="text-emerald-400">2.</span> Wykonawca ma prawo korzystać z podwykonawców (np. grafików, copywriterów), przy czym ponosi pełną odpowiedzialność za ich działania wobec Zleceniodawcy.</p>
              <p><span className="text-emerald-400">3.</span> Wykonawca realizuje działania marketingowe z należytą starannością, zgodnie z aktualną wiedzą i praktyką rynkową, przy czym nie gwarantuje osiągnięcia określonych wyników finansowych, sprzedażowych czy frekwencyjnych.</p>
              <p><span className="text-emerald-400">4.</span> Wykonawca zobowiązuje się do zachowania w poufności wszelkich informacji uzyskanych od Zleceniodawcy w związku z realizacją niniejszej umowy, także po jej zakończeniu.</p>
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
              <p><span className="text-purple-400">1.</span> Zleceniodawca zobowiązuje się do:</p>
              <p className="pl-2"><span className="text-purple-400">a)</span> udostępnienia Wykonawcy dostępu do fanpage na Facebooku oraz konta reklamowego w systemie Meta Ads Manager,</p>
              <p className="pl-2"><span className="text-purple-400">b)</span> przekazania niezbędnych materiałów (np. zdjęć, opisów usług, logo, informacji o promocjach),</p>
              <p className="pl-2"><span className="text-purple-400">c)</span> akceptuje lub odrzuca propozycje kreacji reklamowych w terminie 3 dni roboczych od ich doręczenia. Brak odpowiedzi w tym terminie uznaje się za akceptację,</p>
              <p className="pl-2"><span className="text-purple-400">d)</span> przekazywania informacji o zmianach w ofercie lub działalności, które mogą mieć wpływ na prowadzone kampanie,</p>
              <p className="pl-2"><span className="text-purple-400">e)</span> terminowego uiszczania ustalonego wynagrodzenia.</p>
              <p><span className="text-purple-400">2.</span> Zleceniodawca ponosi odpowiedzialność za zgodność z prawem oraz prawdziwość materiałów i treści dostarczonych Wykonawcy.</p>
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
              </div>
            </div>
          </div>

          <div className="text-[9px] text-zinc-400 space-y-1 mb-3">
            <p><span className="text-pink-400">1.</span> Za świadczenie usług określonych w niniejszej umowie Zleceniodawca zapłaci Wykonawcy wynagrodzenie w wysokości <span className="text-white font-semibold">{formatAmount(totalValue)}</span> brutto miesięcznie.</p>
          </div>

          {data.paymentType === "split" ? (
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-[8px] text-zinc-500 uppercase mb-1">Zaliczka (50%)</p>
                <p className="text-lg font-bold text-white">{formatAmount(advanceValue)}</p>
                <p className="text-[8px] text-zinc-500">w terminie 3 dni od otrzymania umowy</p>
              </div>
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-[8px] text-zinc-500 uppercase mb-1">Pozostała część (50%)</p>
                <p className="text-lg font-bold text-white">{formatAmount(remainingValue)}</p>
                <p className="text-[8px] text-zinc-500">płatna w terminie 7 dni od zakończenia umowy</p>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 rounded-xl p-3 text-center mb-3">
              <p className="text-[8px] text-zinc-500 uppercase mb-1">Płatność jednorazowa</p>
              <p className="text-xl font-bold text-white">{formatAmount(totalValue)}</p>
              <p className="text-[8px] text-zinc-500">w ciągu 3 dni od otrzymania umowy w formie elektronicznej</p>
            </div>
          )}

          <div className="text-[8px] text-zinc-500 space-y-1">
            <p>• W przypadku opóźnienia w płatności Wykonawca ma prawo wstrzymać świadczenie usług do momentu uregulowania zaległości.</p>
            <p>• Budżet reklamowy na kampanie w systemie Meta Ads Manager finansowany jest w całości przez Zleceniodawcę i nie stanowi części wynagrodzenia Wykonawcy. Wykonawca nie ponosi odpowiedzialności za brak efektów kampanii wynikający z niedostatecznego budżetu reklamowego.</p>
          </div>
        </div>

        {/* §5-8 Grid */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <p className="text-[9px] font-semibold text-purple-300">§5 Prawa autorskie</p>
            </div>
            <div className="text-[7px] text-zinc-500 leading-relaxed space-y-0.5">
              <p>1. Wszelkie materiały reklamowe przygotowane przez Wykonawcę podlegają ochronie prawnoautorskiej.</p>
              <p>2. Z chwilą uregulowania pełnego wynagrodzenia, Wykonawca udziela Zleceniodawcy niewyłącznej, bezterminowej licencji na korzystanie z materiałów.</p>
              <p>3. Zleceniodawca nie ma prawa do odsprzedaży ani sublicencjonowania materiałów bez zgody Wykonawcy.</p>
              <p>4. Wykonawca zachowuje prawo do wykorzystywania materiałów w celach portfolio.</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <p className="text-[9px] font-semibold text-amber-300">§6 Określenie terminów</p>
            </div>
            <div className="text-[7px] text-zinc-500 leading-relaxed space-y-0.5">
              <p>1. Umowa zostaje zawarta i obowiązuje od dnia dokonania przez Zleceniodawcę wpłaty zaliczki, o której mowa w §4 ust. 2.</p>
              <p>2. Po upływie pierwszego miesiąca umowa może zostać przedłużona wyłącznie za zgodą obu stron, na warunkach ustalonych w odrębnym aneksie lub w formie potwierdzenia mailowego.</p>
              <p>3. W przypadku rażącego naruszenia postanowień umowy, rozwiązanie może nastąpić ze skutkiem natychmiastowym.</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
              <p className="text-[9px] font-semibold text-red-300">§7 Rozwiązanie umowy</p>
            </div>
            <div className="text-[7px] text-zinc-500 leading-relaxed space-y-0.5">
              <p>1. Umowa może zostać rozwiązana przez każdą ze stron z zachowaniem zasad określonych w § 6.</p>
              <p>2. Wykonawca ma prawo rozwiązać umowę natychmiastowo, jeżeli Zleceniodawca opóźnia się z płatnością o więcej niż 14 dni lub nie przekazuje niezbędnych materiałów.</p>
              <p>3. Zleceniodawca ma prawo rozwiązać umowę natychmiastowo, jeżeli Wykonawca rażąco narusza obowiązki określone w § 2.</p>
              <p>4. Rozwiązanie umowy wymaga formy pisemnej (w tym elektronicznej).</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Scale className="w-3 h-3 text-white" />
              </div>
              <p className="text-[9px] font-semibold text-teal-300">§8 Postanowienia końcowe</p>
            </div>
            <div className="text-[7px] text-zinc-500 leading-relaxed space-y-0.5">
              <p>1. W sprawach nieuregulowanych niniejszą umową zastosowanie mają przepisy Kodeksu cywilnego.</p>
              <p>2. Umowa została sporządzona i przekazana w formie elektronicznej (plik PDF) drogą mailową. Strony zgodnie przyjmują, że taka forma jest wystarczająca do jej ważności i wykonywania, a podpisanie umowy nie jest wymagane, jeżeli Zleceniodawca przystąpi do jej realizacji.</p>
            </div>
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
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Agencja marketingowa Aurine</p>
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

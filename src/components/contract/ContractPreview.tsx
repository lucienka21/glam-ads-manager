import agencyLogo from "@/assets/agency-logo.png";

interface ContractData {
  clientName: string;
  clientOwnerName: string;
  clientAddress: string;
  clientNIP: string;
  clientEmail: string;
  clientPhone: string;
  signDate: string;
  signCity: string;
  contractValue: string;
  agencyName: string;
  agencyOwner: string;
  agencyAddress: string;
  agencyNIP: string;
  agencyEmail: string;
}

interface ContractPreviewProps {
  data: ContractData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "…………………";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
};

const formatAmount = (amount: string) => {
  if (!amount) return "…………";
  const num = parseFloat(amount);
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

// Decorative components matching invoice style
const GradientOrbs = () => (
  <>
    <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-transparent blur-[80px]" />
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent blur-[80px]" />
  </>
);

const FloatingShapes = () => (
  <>
    <div className="absolute top-8 right-16 w-12 h-12 border border-pink-500/20 rounded-full" />
    <div className="absolute top-20 right-8 w-4 h-4 bg-pink-500/10 rounded-lg rotate-45" />
    <div className="absolute bottom-24 left-8 w-8 h-8 border border-fuchsia-500/15 rounded-xl rotate-12" />
  </>
);

const DotsPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute opacity-15 ${className}`}>
    <div className="grid grid-cols-3 gap-1.5">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="w-0.5 h-0.5 rounded-full bg-pink-400" />
      ))}
    </div>
  </div>
);

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  return (
    <div
      id="contract-preview"
      className="w-[595px] min-h-[842px] relative overflow-hidden"
      style={{ backgroundColor: '#09090b' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      <DotsPattern className="top-12 right-4" />
      <DotsPattern className="bottom-32 left-4" />

      {/* Content */}
      <div className="relative h-full flex flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/30 blur-lg rounded-full" />
              <img src={agencyLogo} alt="Aurine" className="relative w-8 h-8 object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                Aurine
              </p>
              <p className="text-[8px] text-zinc-500 tracking-wide">Marketing dla salonów beauty</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-lg">
              <span className="text-white text-xs font-semibold">Umowa o świadczenie usług marketingowych</span>
            </div>
          </div>
        </div>

        {/* Date and City */}
        <div className="flex gap-3 mb-3">
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-800/40 border border-zinc-700/50 rounded-lg">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="text-[7px] text-zinc-500 uppercase tracking-wider">Data zawarcia</p>
              <p className="text-white font-medium text-[9px]">{formatDate(data.signDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-800/40 border border-zinc-700/50 rounded-lg">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="text-[7px] text-zinc-500 uppercase tracking-wider">Miejscowość</p>
              <p className="text-white font-medium text-[9px]">{data.signCity || "…………………"}</p>
            </div>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-2">
            <p className="text-[8px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">Zleceniodawca</p>
            <p className="text-[10px] font-bold text-white">{data.clientName || "…………………………………"}</p>
            {data.clientOwnerName && <p className="text-[8px] text-zinc-400">{data.clientOwnerName}</p>}
            {data.clientAddress && <p className="text-[8px] text-zinc-500 mt-0.5">{data.clientAddress}</p>}
            {data.clientNIP && <p className="text-[8px] text-zinc-500">NIP: {data.clientNIP}</p>}
            {data.clientEmail && <p className="text-[8px] text-zinc-500">{data.clientEmail}</p>}
            {data.clientPhone && <p className="text-[8px] text-zinc-500">Tel: {data.clientPhone}</p>}
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-fuchsia-500/50 rounded-lg blur-sm opacity-30" />
            <div className="relative bg-zinc-900 border border-pink-500/30 rounded-lg p-2">
              <p className="text-[8px] text-pink-400 uppercase tracking-wider font-semibold mb-1">Wykonawca</p>
              <p className="text-[10px] font-bold text-white">{data.agencyName || "Agencja Marketingowa Aurine"}</p>
              {data.agencyOwner && <p className="text-[8px] text-zinc-400">{data.agencyOwner}</p>}
              {data.agencyAddress && <p className="text-[8px] text-zinc-500 mt-0.5">{data.agencyAddress}</p>}
              {data.agencyNIP && <p className="text-[8px] text-zinc-500">NIP: {data.agencyNIP}</p>}
              <p className="text-[8px] text-zinc-500">{data.agencyEmail || "kontakt@aurine.pl"}</p>
            </div>
          </div>
        </div>

        {/* Contract Value */}
        <div className="relative mb-2 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-lg blur-sm opacity-30" />
          <div className="relative flex justify-between items-center py-2 px-3 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-lg">
            <div>
              <span className="text-[8px] text-pink-300 uppercase tracking-wider font-semibold">Wynagrodzenie miesięczne</span>
              <p className="text-[7px] text-zinc-500">Płatność zgodnie z §4</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-white">{formatAmount(data.contractValue)} zł</span>
              <p className="text-[7px] text-pink-300">brutto/miesiąc</p>
            </div>
          </div>
        </div>

        {/* Intro text */}
        <p className="text-[7px] text-zinc-500 mb-2 leading-relaxed">
          Strony oświadczają, że niniejsza umowa została zawarta w celu określenia zasad współpracy w zakresie świadczenia usług marketingowych przez Wykonawcę na rzecz Zleceniodawcy, w tym w szczególności świadczenia usług promocyjnych, reklamowych oraz doradztwa marketingowego.
        </p>

        {/* Contract Sections - Compact layout */}
        <div className="space-y-1.5 flex-1 text-[7px]">
          {/* §1 Przedmiot umowy */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[8px] text-pink-400 font-semibold mb-0.5">§1 Przedmiot umowy</p>
            <p className="text-zinc-400 leading-relaxed">
              1. Przedmiotem umowy jest świadczenie przez Wykonawcę usług marketingowych online: a) tworzenie i prowadzenie kampanii Facebook Ads, b) przygotowanie materiałów reklamowych, c) optymalizacja i monitorowanie wyników, d) sporządzanie raportów, e) doradztwo marketingowe.
              2. Usługi świadczone będą w oparciu o materiały i dostęp do kont reklamowych udostępnione przez Zleceniodawcę.
              3. Wykonawca zobowiązuje się realizować zadania z należytą starannością.
            </p>
          </div>

          {/* §2 Obowiązki Wykonawcy */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[8px] text-pink-400 font-semibold mb-0.5">§2 Obowiązki Wykonawcy</p>
            <p className="text-zinc-400 leading-relaxed">
              1. Wykonawca zobowiązuje się do: a) prowadzenia kampanii zgodnie z celami, b) przygotowywania kreacji reklamowych, c) bieżącej optymalizacji kampanii, d) przekazywania raportów do 7. dnia roboczego następnego miesiąca, e) udzielania konsultacji marketingowych.
              2. Wykonawca może korzystać z podwykonawców, ponosząc za nich odpowiedzialność.
              3. Wykonawca nie gwarantuje określonych wyników finansowych.
              4. Wykonawca zobowiązuje się do zachowania poufności informacji.
            </p>
          </div>

          {/* §3 Obowiązki Zleceniodawcy */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[8px] text-pink-400 font-semibold mb-0.5">§3 Obowiązki Zleceniodawcy</p>
            <p className="text-zinc-400 leading-relaxed">
              1. Zleceniodawca zobowiązuje się do: a) udostępnienia dostępu do fanpage i Meta Ads Manager, b) przekazania materiałów (zdjęcia, opisy, logo), c) akceptacji kreacji w 3 dni robocze (brak odpowiedzi = akceptacja), d) informowania o zmianach w ofercie, e) terminowego uiszczania wynagrodzenia.
              2. Zleceniodawca ponosi odpowiedzialność za zgodność materiałów z prawem.
            </p>
          </div>

          {/* §4 Wynagrodzenie */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[8px] text-pink-400 font-semibold mb-0.5">§4 Wynagrodzenie</p>
            <p className="text-zinc-400 leading-relaxed">
              1. Wynagrodzenie: <span className="text-pink-300 font-medium">{formatAmount(data.contractValue)} zł brutto miesięcznie</span>.
              2. <span className="text-pink-300">Zaliczka 50%</span> w ciągu 3 dni od otrzymania umowy.
              3. <span className="text-pink-300">Pozostałe 50%</span> w 7 dni od zakończenia miesiąca.
              4. W przypadku opóźnienia Wykonawca może wstrzymać usługi.
              5. Budżet reklamowy finansowany przez Zleceniodawcę, nie stanowi wynagrodzenia Wykonawcy.
            </p>
          </div>

          {/* §5 & §6 */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
              <p className="text-[8px] text-pink-400 font-semibold mb-0.5">§5 Prawa autorskie</p>
              <p className="text-zinc-400 leading-relaxed">
                1. Materiały reklamowe podlegają ochronie prawnoautorskiej.
                2. Po uregulowaniu płatności - licencja niewyłączna, bezterminowa.
                3. Zakaz odsprzedaży bez zgody.
                4. Wykonawca może używać w portfolio.
              </p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
              <p className="text-[8px] text-pink-400 font-semibold mb-0.5">§6 Okres obowiązywania</p>
              <p className="text-zinc-400 leading-relaxed">
                1. Umowa obowiązuje od dnia wpłaty zaliczki (§4 ust. 2).
                2. Przedłużenie za zgodą obu stron (aneks lub mail).
                3. Przy rażącym naruszeniu - rozwiązanie natychmiastowe.
              </p>
            </div>
          </div>

          {/* §7 & §8 */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
              <p className="text-[8px] text-pink-400 font-semibold mb-0.5">§7 Rozwiązanie umowy</p>
              <p className="text-zinc-400 leading-relaxed">
                1. Umowa może zostać rozwiązana zgodnie z §6.
                2. Wykonawca może rozwiązać natychmiast gdy: opóźnienie płatności &gt;14 dni, brak materiałów, naruszenie §3.
                3. Zleceniodawca może rozwiązać przy rażącym naruszeniu §2.
                4. Forma pisemna lub elektroniczna.
              </p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
              <p className="text-[8px] text-pink-400 font-semibold mb-0.5">§8 Postanowienia końcowe</p>
              <p className="text-zinc-400 leading-relaxed">
                1. Zastosowanie mają przepisy Kodeksu cywilnego.
                2. Umowa w formie elektronicznej (PDF) jest ważna i wykonywalna. Przystąpienie do realizacji = akceptacja umowy.
              </p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-3">
          <div className="text-center">
            <div className="h-8 border-b-2 border-zinc-700 mb-0.5"></div>
            <p className="text-[8px] text-zinc-500">Zleceniodawca</p>
          </div>
          <div className="text-center">
            <div className="h-8 border-b-2 border-zinc-700 mb-0.5"></div>
            <p className="text-[8px] text-zinc-500">Agencja Marketingowa Aurine</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-1">
            <img src={agencyLogo} alt="Aurine" className="w-3 h-3 object-contain opacity-50" />
            <span className="text-zinc-600 text-[8px]">aurine.pl</span>
          </div>
          <p className="text-[8px] text-zinc-600">Marketing dla salonów beauty</p>
        </div>
      </div>
    </div>
  );
};

import agencyLogo from "@/assets/agency-logo.png";

interface ContractData {
  clientName: string;
  clientAddress: string;
  clientNip?: string;
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
  if (!amount) return "0";
  const num = parseFloat(amount);
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

// Decorative components - same style as Invoice
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

// Icons
const DocumentIcon = () => (
  <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeWidth="2"/>
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2"/>
    <circle cx="12" cy="10" r="3" strokeWidth="2"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2"/>
  </svg>
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
      <DecorativeLines />
      <DotsPattern className="top-16 right-6" />
      <DotsPattern className="bottom-40 left-6" />

      {/* Content */}
      <div className="relative h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
              <img src={agencyLogo} alt="Aurine" className="relative w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-base font-semibold bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                Aurine
              </p>
              <p className="text-[10px] text-zinc-500 tracking-wide">Marketing dla salonów beauty</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-lg">
              <DocumentIcon />
              <span className="text-white text-sm font-semibold">Umowa współpracy</span>
            </div>
          </div>
        </div>

        {/* Date and City */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/40 border border-zinc-700/50 rounded-lg">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <LocationIcon />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Miejsce</p>
              <p className="text-white font-medium text-xs">{data.signCity || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/40 border border-zinc-700/50 rounded-lg">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <CalendarIcon />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Data zawarcia</p>
              <p className="text-white font-medium text-xs">{formatDate(data.signDate)}</p>
            </div>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-fuchsia-500/50 rounded-lg blur-sm opacity-30" />
            <div className="relative bg-zinc-900 border border-pink-500/30 rounded-lg p-3">
              <p className="text-[10px] text-pink-400 uppercase tracking-wider font-semibold mb-2">Wykonawca</p>
              <p className="text-sm font-bold text-white">Agencja Marketingowa Aurine</p>
              <p className="text-xs text-zinc-500 mt-1">{data.agencyAddress || "—"}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{data.agencyEmail || "kontakt@aurine.pl"}</p>
            </div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">Zleceniodawca</p>
            <p className="text-sm font-bold text-white">{data.clientName || "—"}</p>
            <p className="text-xs text-zinc-500 mt-1">{data.clientAddress || "—"}</p>
            {data.clientNip && <p className="text-xs text-zinc-500 mt-0.5">NIP: {data.clientNip}</p>}
          </div>
        </div>

        {/* Contract Value */}
        <div className="relative mb-4">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-lg blur-sm opacity-40" />
          <div className="relative flex items-center justify-between py-3 px-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white rounded-lg">
            <span className="text-xs font-medium uppercase tracking-wider">Wynagrodzenie miesięczne netto</span>
            <span className="text-xl font-bold">{formatAmount(data.contractValue)} zł</span>
          </div>
        </div>

        {/* Contract Sections */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4 flex-1 overflow-hidden">
          <div className="space-y-2.5 text-[9px] text-zinc-400 leading-relaxed">
            {/* §1 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§1 Przedmiot umowy</p>
              <p>Wykonawca zobowiązuje się do świadczenia usług marketingu online: prowadzenie kampanii reklamowych Facebook/Instagram Ads, tworzenie materiałów reklamowych, optymalizacja kampanii, raportowanie wyników i doradztwo marketingowe.</p>
            </div>

            {/* §2 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§2 Obowiązki Wykonawcy</p>
              <p>Prowadzenie kampanii zgodnie z celami Zleceniodawcy, przygotowanie kreacji reklamowych, optymalizacja i zarządzanie budżetem, comiesięczne raporty do 7. dnia miesiąca, zachowanie poufności informacji.</p>
            </div>

            {/* §3 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§3 Obowiązki Zleceniodawcy</p>
              <p>Zapewnienie dostępu do fanpage i konta Meta Ads, dostarczenie materiałów (zdjęcia, logo, opisy), akceptacja kreacji w ciągu 3 dni roboczych, terminowe regulowanie płatności.</p>
            </div>

            {/* §4 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§4 Wynagrodzenie i płatności</p>
              <p>Zaliczka 50% w ciągu 3 dni od otrzymania umowy. Pozostałe 50% do 7 dni od zakończenia miesiąca. <span className="text-pink-300">Budżet reklamowy opłaca Zleceniodawca bezpośrednio do platformy reklamowej</span> – nie wchodzi w zakres wynagrodzenia Wykonawcy.</p>
            </div>

            {/* §5 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§5 Prawa autorskie</p>
              <p>Materiały stworzone przez Wykonawcę podlegają ochronie prawnoautorskiej. Po uregulowaniu płatności Zleceniodawca otrzymuje licencję niewyłączną. Wykonawca może wykorzystać materiały w portfolio.</p>
            </div>

            {/* §6 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§6 Własność konta reklamowego</p>
              <p><span className="text-pink-300">Konto reklamowe oraz wyniki kampanii są własnością Zleceniodawcy.</span> Wykonawca działa jako administrator na podstawie udzielonych dostępów.</p>
            </div>

            {/* §7 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§7 Okres obowiązywania i rozwiązanie</p>
              <p>Umowa obowiązuje od dnia wpłaty zaliczki. <span className="text-pink-300">Umowa może zostać rozwiązana z zachowaniem 30-dniowego okresu wypowiedzenia.</span> Natychmiastowe rozwiązanie przy: opóźnieniu płatności powyżej 14 dni, braku materiałów, istotnym naruszeniu obowiązków.</p>
            </div>

            {/* §8 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§8 Odpowiedzialność</p>
              <p><span className="text-pink-300">Wykonawca nie gwarantuje określonego poziomu wyników kampanii</span> – rezultaty zależą od wielu czynników zewnętrznych. Wykonawca zobowiązuje się do starannego działania zgodnie z najlepszymi praktykami branżowymi.</p>
            </div>

            {/* §9 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§9 Ochrona danych osobowych (RODO)</p>
              <p><span className="text-pink-300">Strony zobowiązują się do przetwarzania danych osobowych zgodnie z RODO.</span> Dane będą przetwarzane wyłącznie w celu realizacji umowy. Każda ze stron odpowiada za bezpieczeństwo danych w swoim zakresie.</p>
            </div>

            {/* §10 */}
            <div>
              <p className="text-[10px] text-pink-400 font-semibold mb-0.5">§10 Postanowienia końcowe</p>
              <p>W sprawach nieuregulowanych zastosowanie mają przepisy Kodeksu cywilnego. Wszelkie zmiany umowy wymagają formy pisemnej lub elektronicznej. Przystąpienie do realizacji jest równoznaczne z akceptacją warunków.</p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-4 pt-3">
          <div className="text-center">
            <div className="h-10 border-b border-zinc-600/50 mb-1.5"></div>
            <p className="text-[10px] text-zinc-500">Zleceniodawca</p>
          </div>
          <div className="text-center">
            <div className="h-10 border-b border-zinc-600/50 mb-1.5"></div>
            <p className="text-[10px] text-zinc-500">Wykonawca</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800/80">
          <div className="flex items-center gap-2">
            <img src={agencyLogo} alt="Aurine" className="w-4 h-4 object-contain opacity-40" />
            <span className="text-zinc-600 text-[9px]">aurine.pl</span>
          </div>
          <p className="text-[9px] text-zinc-600">Marketing dla salonów beauty</p>
        </div>
      </div>
    </div>
  );
};

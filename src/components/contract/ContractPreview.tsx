import agencyLogo from "@/assets/agency-logo.png";

interface ContractData {
  clientName: string;
  clientOwnerName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  clientNip: string;
  signDate: string;
  signCity: string;
  contractValue: string;
  agencyName: string;
  agencyOwnerName: string;
  agencyAddress: string;
  agencyPhone: string;
  agencyEmail: string;
  agencyNip: string;
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

// Decorative components matching invoice style
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
              <span className="text-white text-sm font-semibold">Umowa współpracy</span>
            </div>
          </div>
        </div>

        {/* Date and City */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/40 border border-zinc-700/50 rounded-lg">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Data zawarcia</p>
              <p className="text-white font-medium text-xs">{formatDate(data.signDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/40 border border-zinc-700/50 rounded-lg">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Miejscowość</p>
              <p className="text-white font-medium text-xs">{data.signCity || "—"}</p>
            </div>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-fuchsia-500/50 rounded-lg blur-sm opacity-30" />
            <div className="relative bg-zinc-900 border border-pink-500/30 rounded-lg p-3">
              <p className="text-[10px] text-pink-400 uppercase tracking-wider font-semibold mb-2">Wykonawca</p>
              <p className="text-sm font-bold text-white">{data.agencyName || "Agencja Marketingowa Aurine"}</p>
              {data.agencyOwnerName && <p className="text-[10px] text-zinc-400 mt-0.5">{data.agencyOwnerName}</p>}
              {data.agencyAddress && <p className="text-[10px] text-zinc-500 mt-0.5">{data.agencyAddress}</p>}
              <div className="mt-1 space-y-0.5">
                {data.agencyPhone && <p className="text-[10px] text-zinc-500">Tel: {data.agencyPhone}</p>}
                <p className="text-[10px] text-zinc-500">{data.agencyEmail || "kontakt@aurine.pl"}</p>
                {data.agencyNip && <p className="text-[10px] text-zinc-500">NIP: {data.agencyNip}</p>}
              </div>
            </div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">Zleceniodawca</p>
            <p className="text-sm font-bold text-white">{data.clientName || "—"}</p>
            {data.clientOwnerName && <p className="text-[10px] text-zinc-400 mt-0.5">{data.clientOwnerName}</p>}
            {data.clientAddress && <p className="text-[10px] text-zinc-500 mt-0.5">{data.clientAddress}</p>}
            <div className="mt-1 space-y-0.5">
              {data.clientPhone && <p className="text-[10px] text-zinc-500">Tel: {data.clientPhone}</p>}
              {data.clientEmail && <p className="text-[10px] text-zinc-500">{data.clientEmail}</p>}
              {data.clientNip && <p className="text-[10px] text-zinc-500">NIP: {data.clientNip}</p>}
            </div>
          </div>
        </div>

        {/* Contract Value */}
        <div className="relative mb-4 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-lg blur-sm opacity-40" />
          <div className="relative flex justify-between items-center py-3 px-4 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-lg">
            <div>
              <span className="text-[10px] text-pink-300 uppercase tracking-wider font-semibold">Wynagrodzenie miesięczne</span>
              <p className="text-[9px] text-zinc-500">Płatność zgodnie z warunkami umowy</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-white">{formatAmount(data.contractValue)} zł</span>
              <p className="text-[9px] text-pink-300">brutto/miesiąc</p>
            </div>
          </div>
        </div>

        {/* Contract Sections */}
        <div className="space-y-2 flex-1">
          {/* §1 Przedmiot umowy */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-2.5">
            <p className="text-[10px] text-pink-400 font-semibold mb-1">§1 Przedmiot umowy</p>
            <p className="text-[9px] text-zinc-400 leading-relaxed">
              Świadczenie usług marketingowych online: kampanie Facebook Ads, materiały reklamowe, optymalizacja, raportowanie i doradztwo marketingowe.
            </p>
          </div>

          {/* §2 & §3 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-2.5">
              <p className="text-[10px] text-pink-400 font-semibold mb-1">§2 Obowiązki Wykonawcy</p>
              <ul className="text-[8px] text-zinc-400 leading-relaxed space-y-0.5">
                <li>• Prowadzenie kampanii zgodnie z celami</li>
                <li>• Kreacje reklamowe i optymalizacja</li>
                <li>• Raporty do 7. dnia miesiąca</li>
                <li>• Zachowanie poufności</li>
              </ul>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-2.5">
              <p className="text-[10px] text-pink-400 font-semibold mb-1">§3 Obowiązki Zleceniodawcy</p>
              <ul className="text-[8px] text-zinc-400 leading-relaxed space-y-0.5">
                <li>• Dostęp do fanpage i konta Meta Ads</li>
                <li>• Materiały (zdjęcia, opisy, logo)</li>
                <li>• Akceptacja kreacji w 3 dni robocze</li>
                <li>• Terminowe płatności</li>
              </ul>
            </div>
          </div>

          {/* §4 Wynagrodzenie */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-2.5">
            <p className="text-[10px] text-pink-400 font-semibold mb-1">§4 Wynagrodzenie</p>
            <p className="text-[8px] text-zinc-400 leading-relaxed">
              <span className="text-pink-300">Zaliczka 50%</span> w ciągu 3 dni od otrzymania umowy. <span className="text-pink-300">Pozostałe 50%</span> w 7 dni od zakończenia miesiąca. Budżet reklamowy finansowany przez Zleceniodawcę.
            </p>
          </div>

          {/* §5 & §6 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-2.5">
              <p className="text-[10px] text-pink-400 font-semibold mb-1">§5 Prawa autorskie</p>
              <p className="text-[8px] text-zinc-400 leading-relaxed">
                Materiały chronione prawem autorskim. Licencja niewyłączna po uregulowaniu płatności. Wykonawca może używać w portfolio.
              </p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-2.5">
              <p className="text-[10px] text-pink-400 font-semibold mb-1">§6 Okres obowiązywania</p>
              <p className="text-[8px] text-zinc-400 leading-relaxed">
                Umowa obowiązuje od dnia wpłaty zaliczki. Przedłużenie za zgodą obu stron. Możliwość natychmiastowego rozwiązania przy naruszeniach.
              </p>
            </div>
          </div>

          {/* §7 & §8 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-2.5">
              <p className="text-[10px] text-pink-400 font-semibold mb-1">§7 Rozwiązanie umowy</p>
              <p className="text-[8px] text-zinc-400 leading-relaxed">
                Natychmiastowe rozwiązanie przy: opóźnieniu płatności &gt;14 dni, braku materiałów, naruszeniu obowiązków. Forma pisemna lub elektroniczna.
              </p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-2.5">
              <p className="text-[10px] text-pink-400 font-semibold mb-1">§8 Postanowienia końcowe</p>
              <p className="text-[8px] text-zinc-400 leading-relaxed">
                Zastosowanie Kodeksu cywilnego. Forma elektroniczna wystarczająca. Przystąpienie do realizacji = akceptacja umowy.
              </p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-10 mt-4">
          <div className="text-center">
            <div className="h-10 border-b-2 border-zinc-700 mb-1"></div>
            <p className="text-[10px] text-zinc-500">Zleceniodawca</p>
          </div>
          <div className="text-center">
            <div className="h-10 border-b-2 border-zinc-700 mb-1"></div>
            <p className="text-[10px] text-zinc-500">Wykonawca</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex items-center gap-1.5">
            <img src={agencyLogo} alt="Aurine" className="w-4 h-4 object-contain opacity-50" />
            <span className="text-zinc-600 text-[10px]">aurine.pl</span>
          </div>
          <p className="text-[10px] text-zinc-600">Marketing dla salonów beauty</p>
        </div>
      </div>
    </div>
  );
};
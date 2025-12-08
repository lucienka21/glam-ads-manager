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

const GradientOrbs = () => (
  <>
    <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-500/15 via-fuchsia-500/8 to-transparent blur-[60px]" />
    <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/8 to-transparent blur-[60px]" />
  </>
);

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  return (
    <div
      id="contract-preview"
      className="w-[595px] h-[842px] relative overflow-hidden"
      style={{ backgroundColor: '#09090b' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />

      <div className="relative h-full flex flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/30 blur-lg rounded-full" />
              <img src={agencyLogo} alt="Aurine" className="relative w-7 h-7 object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">Aurine</p>
              <p className="text-[6px] text-zinc-500">Marketing dla salonów beauty</p>
            </div>
          </div>
          <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-lg">
            <span className="text-white text-[9px] font-semibold">Umowa o świadczenie usług marketingowych</span>
          </div>
        </div>

        {/* Date, City & Value row */}
        <div className="flex gap-2 mb-2">
          <div className="flex items-center gap-1 px-1.5 py-1 bg-zinc-800/40 border border-zinc-700/50 rounded text-[7px]">
            <span className="text-zinc-500">Data:</span>
            <span className="text-white font-medium">{formatDate(data.signDate)}</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-1 bg-zinc-800/40 border border-zinc-700/50 rounded text-[7px]">
            <span className="text-zinc-500">Miejsce:</span>
            <span className="text-white font-medium">{data.signCity || "…………"}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded text-[7px] ml-auto">
            <span className="text-pink-300">Wynagrodzenie:</span>
            <span className="text-white font-bold">{formatAmount(data.contractValue)} zł/mies.</span>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[6px] text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">Zleceniodawca</p>
            <p className="text-[8px] font-bold text-white leading-tight">{data.clientName || "…………………………"}</p>
            {data.clientOwnerName && <p className="text-[7px] text-zinc-400">{data.clientOwnerName}</p>}
            {data.clientAddress && <p className="text-[6px] text-zinc-500">{data.clientAddress}</p>}
            <div className="flex gap-2 text-[6px] text-zinc-500">
              {data.clientNIP && <span>NIP: {data.clientNIP}</span>}
              {data.clientEmail && <span>{data.clientEmail}</span>}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/40 to-fuchsia-500/40 rounded blur-sm opacity-30" />
            <div className="relative bg-zinc-900 border border-pink-500/30 rounded p-1.5">
              <p className="text-[6px] text-pink-400 uppercase tracking-wider font-semibold mb-0.5">Wykonawca</p>
              <p className="text-[8px] font-bold text-white leading-tight">{data.agencyName || "Agencja Marketingowa Aurine"}</p>
              {data.agencyOwner && <p className="text-[7px] text-zinc-400">{data.agencyOwner}</p>}
              {data.agencyAddress && <p className="text-[6px] text-zinc-500">{data.agencyAddress}</p>}
              <div className="flex gap-2 text-[6px] text-zinc-500">
                {data.agencyNIP && <span>NIP: {data.agencyNIP}</span>}
                <span>{data.agencyEmail || "kontakt@aurine.pl"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intro */}
        <p className="text-[6px] text-zinc-500 mb-1.5 leading-relaxed">
          Strony zawierają umowę w celu określenia zasad współpracy w zakresie świadczenia usług marketingowych, promocyjnych, reklamowych oraz doradztwa marketingowego.
        </p>

        {/* Contract Sections */}
        <div className="grid grid-cols-2 gap-1.5 flex-1 text-[6px]">
          {/* §1 */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[7px] text-pink-400 font-semibold mb-0.5">§1 Przedmiot umowy</p>
            <p className="text-zinc-400 leading-relaxed">
              Świadczenie usług marketingowych: kampanie Facebook Ads, materiały reklamowe, optymalizacja, raportowanie i doradztwo. Usługi realizowane z należytą starannością.
            </p>
          </div>

          {/* §2 */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[7px] text-pink-400 font-semibold mb-0.5">§2 Obowiązki Wykonawcy</p>
            <p className="text-zinc-400 leading-relaxed">
              Prowadzenie kampanii, kreacje reklamowe, optymalizacja, raporty do 7. dnia miesiąca, konsultacje. Zachowanie poufności. Brak gwarancji określonych wyników.
            </p>
          </div>

          {/* §3 */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[7px] text-pink-400 font-semibold mb-0.5">§3 Obowiązki Zleceniodawcy</p>
            <p className="text-zinc-400 leading-relaxed">
              Dostęp do fanpage i Meta Ads, materiały (zdjęcia, logo), akceptacja kreacji w 3 dni robocze, informowanie o zmianach, terminowe płatności.
            </p>
          </div>

          {/* §4 */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[7px] text-pink-400 font-semibold mb-0.5">§4 Wynagrodzenie</p>
            <p className="text-zinc-400 leading-relaxed">
              <span className="text-pink-300">{formatAmount(data.contractValue)} zł brutto/mies.</span> Zaliczka 50% w 3 dni od umowy. Pozostałe 50% w 7 dni po miesiącu. Budżet reklamowy finansuje Zleceniodawca.
            </p>
          </div>

          {/* §5 */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[7px] text-pink-400 font-semibold mb-0.5">§5 Prawa autorskie</p>
            <p className="text-zinc-400 leading-relaxed">
              Materiały chronione prawem autorskim. Po zapłacie - licencja niewyłączna, bezterminowa. Wykonawca może używać w portfolio.
            </p>
          </div>

          {/* §6 */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[7px] text-pink-400 font-semibold mb-0.5">§6 Okres obowiązywania</p>
            <p className="text-zinc-400 leading-relaxed">
              Umowa od dnia wpłaty zaliczki. Przedłużenie za zgodą stron (aneks/mail). Przy rażącym naruszeniu - rozwiązanie natychmiastowe.
            </p>
          </div>

          {/* §7 */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[7px] text-pink-400 font-semibold mb-0.5">§7 Rozwiązanie umowy</p>
            <p className="text-zinc-400 leading-relaxed">
              Wykonawca może rozwiązać przy: opóźnieniu płatności &gt;14 dni, braku materiałów, naruszeniu §3. Forma pisemna lub elektroniczna.
            </p>
          </div>

          {/* §8 */}
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded p-1.5">
            <p className="text-[7px] text-pink-400 font-semibold mb-0.5">§8 Postanowienia końcowe</p>
            <p className="text-zinc-400 leading-relaxed">
              Zastosowanie Kodeksu cywilnego. Forma elektroniczna (PDF) wystarczająca. Przystąpienie do realizacji = akceptacja umowy.
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-3">
          <div className="text-center">
            <div className="h-6 border-b border-zinc-700 mb-0.5"></div>
            <p className="text-[7px] text-zinc-500">Zleceniodawca</p>
          </div>
          <div className="text-center">
            <div className="h-6 border-b border-zinc-700 mb-0.5"></div>
            <p className="text-[7px] text-zinc-500">Agencja Marketingowa Aurine</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <img src={agencyLogo} alt="Aurine" className="w-3 h-3 object-contain opacity-50" />
            <span className="text-zinc-600 text-[7px]">aurine.pl</span>
          </div>
          <p className="text-[7px] text-zinc-600">Marketing dla salonów beauty</p>
        </div>
      </div>
    </div>
  );
};

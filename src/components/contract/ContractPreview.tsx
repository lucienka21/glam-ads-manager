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

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  return (
    <div
      id="contract-preview"
      className="w-[595px] min-h-[842px] relative overflow-hidden"
      style={{ backgroundColor: '#18181b' }}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/30 via-transparent to-zinc-800/20" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative h-full flex flex-col p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-700/50">
          <div className="flex items-center gap-2">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
            <div>
              <p className="text-sm font-semibold text-white">Aurine</p>
              <p className="text-[8px] text-zinc-500">Marketing dla salonów beauty</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-pink-400 uppercase tracking-wider">Umowa współpracy</p>
            <p className="text-[9px] text-zinc-500">{data.signCity}, {formatDate(data.signDate)}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-zinc-800/60 rounded p-2.5 border-l-2 border-pink-500">
            <p className="text-[8px] text-pink-400 uppercase tracking-wider font-semibold mb-1">Wykonawca</p>
            <p className="text-[10px] font-bold text-white">Agencja Marketingowa Aurine</p>
            <p className="text-[8px] text-zinc-400 mt-0.5">{data.agencyAddress || "—"}</p>
            <p className="text-[8px] text-zinc-400">{data.agencyEmail || "kontakt@aurine.pl"}</p>
          </div>
          <div className="bg-zinc-800/40 rounded p-2.5 border-l-2 border-zinc-600">
            <p className="text-[8px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">Zleceniodawca</p>
            <p className="text-[10px] font-bold text-white">{data.clientName || "—"}</p>
            <p className="text-[8px] text-zinc-400 mt-0.5">{data.clientAddress || "—"}</p>
            {data.clientNip && <p className="text-[8px] text-zinc-400">NIP: {data.clientNip}</p>}
          </div>
        </div>

        {/* Contract Value */}
        <div className="flex items-center justify-between bg-gradient-to-r from-pink-500/20 to-fuchsia-500/10 rounded p-2.5 mb-3 border border-pink-500/30">
          <span className="text-[9px] text-pink-300 uppercase tracking-wider font-semibold">Wynagrodzenie miesięczne netto</span>
          <span className="text-base font-bold text-white">{formatAmount(data.contractValue)} zł</span>
        </div>

        {/* Contract Sections - Compact */}
        <div className="space-y-1.5 text-[8px] text-zinc-300 flex-1">
          {/* §1 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§1 Przedmiot umowy</p>
            <p className="text-zinc-400 leading-relaxed">
              Wykonawca zobowiązuje się do świadczenia usług marketingu online: prowadzenie kampanii reklamowych Facebook/Instagram Ads, tworzenie materiałów reklamowych, optymalizacja kampanii, raportowanie wyników i doradztwo marketingowe.
            </p>
          </div>

          {/* §2 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§2 Obowiązki Wykonawcy</p>
            <p className="text-zinc-400 leading-relaxed">
              Prowadzenie kampanii zgodnie z celami Zleceniodawcy, przygotowanie kreacji reklamowych, optymalizacja i zarządzanie budżetem, comiesięczne raporty do 7. dnia miesiąca, zachowanie poufności informacji.
            </p>
          </div>

          {/* §3 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§3 Obowiązki Zleceniodawcy</p>
            <p className="text-zinc-400 leading-relaxed">
              Zapewnienie dostępu do fanpage i konta Meta Ads, dostarczenie materiałów (zdjęcia, logo, opisy), akceptacja kreacji w ciągu 3 dni roboczych, terminowe regulowanie płatności.
            </p>
          </div>

          {/* §4 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§4 Wynagrodzenie i płatności</p>
            <p className="text-zinc-400 leading-relaxed">
              Zaliczka 50% w ciągu 3 dni od otrzymania umowy. Pozostałe 50% do 7 dni od zakończenia miesiąca. <span className="text-pink-300">Budżet reklamowy opłaca Zleceniodawca bezpośrednio do platformy reklamowej</span> – nie wchodzi w zakres wynagrodzenia Wykonawcy.
            </p>
          </div>

          {/* §5 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§5 Prawa autorskie</p>
            <p className="text-zinc-400 leading-relaxed">
              Materiały stworzone przez Wykonawcę podlegają ochronie prawnoautorskiej. Po uregulowaniu płatności Zleceniodawca otrzymuje licencję niewyłączną. Wykonawca może wykorzystać materiały w portfolio.
            </p>
          </div>

          {/* §6 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§6 Własność konta reklamowego</p>
            <p className="text-zinc-400 leading-relaxed">
              <span className="text-pink-300">Konto reklamowe oraz wyniki kampanii są własnością Zleceniodawcy.</span> Wykonawca działa jako administrator na podstawie udzielonych dostępów.
            </p>
          </div>

          {/* §7 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§7 Okres obowiązywania i rozwiązanie</p>
            <p className="text-zinc-400 leading-relaxed">
              Umowa obowiązuje od dnia wpłaty zaliczki. <span className="text-pink-300">Umowa może zostać rozwiązana z zachowaniem 30-dniowego okresu wypowiedzenia.</span> Natychmiastowe rozwiązanie przy: opóźnieniu płatności powyżej 14 dni, braku materiałów, istotnym naruszeniu obowiązków.
            </p>
          </div>

          {/* §8 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§8 Odpowiedzialność</p>
            <p className="text-zinc-400 leading-relaxed">
              <span className="text-pink-300">Wykonawca nie gwarantuje określonego poziomu wyników kampanii</span> – rezultaty zależą od wielu czynników zewnętrznych. Wykonawca zobowiązuje się do starannego działania zgodnie z najlepszymi praktykami branżowymi.
            </p>
          </div>

          {/* §9 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§9 Ochrona danych osobowych (RODO)</p>
            <p className="text-zinc-400 leading-relaxed">
              <span className="text-pink-300">Strony zobowiązują się do przetwarzania danych osobowych zgodnie z RODO.</span> Dane będą przetwarzane wyłącznie w celu realizacji umowy. Każda ze stron odpowiada za bezpieczeństwo danych w swoim zakresie.
            </p>
          </div>

          {/* §10 */}
          <div>
            <p className="text-[9px] text-pink-400 font-semibold">§10 Postanowienia końcowe</p>
            <p className="text-zinc-400 leading-relaxed">
              W sprawach nieuregulowanych zastosowanie mają przepisy Kodeksu cywilnego. Wszelkie zmiany umowy wymagają formy pisemnej lub elektronicznej. Przystąpienie do realizacji jest równoznaczne z akceptacją warunków.
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-3 pt-2">
          <div className="text-center">
            <div className="h-8 border-b border-zinc-600 mb-1"></div>
            <p className="text-[8px] text-zinc-500">Zleceniodawca</p>
          </div>
          <div className="text-center">
            <div className="h-8 border-b border-zinc-600 mb-1"></div>
            <p className="text-[8px] text-zinc-500">Wykonawca</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-1">
            <img src={agencyLogo} alt="Aurine" className="w-3 h-3 object-contain opacity-40" />
            <span className="text-zinc-600 text-[7px]">aurine.pl</span>
          </div>
          <p className="text-[7px] text-zinc-600">Marketing dla salonów beauty</p>
        </div>
      </div>
    </div>
  );
};

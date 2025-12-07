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
  agencyEmail: string;
  agencyAddress: string;
  services: ServiceItem[];
}

interface ContractPreviewProps {
  data: ContractData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
};

const formatAmount = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0";
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  const totalValue = parseFloat(data.contractValue) || 0;
  const advanceValue = data.paymentType === "split" ? (parseFloat(data.advanceAmount) || 0) : 0;
  const remainingValue = data.paymentType === "split" ? Math.max(0, totalValue - advanceValue) : 0;

  return (
    <div
      id="contract-preview"
      className="w-[794px] min-h-[1123px] bg-zinc-950 text-white font-sans"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-950/40 via-zinc-950 to-zinc-950 px-10 py-6 border-b border-pink-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={agencyLogo} 
              alt="Aurine" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-pink-400/80 font-medium">
                Aurine Agency
              </p>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Umowa Współpracy
              </h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Data zawarcia</p>
            <p className="text-base font-semibold text-white">{formatDate(data.signDate)}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{data.signCity || "—"}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-6 space-y-5">
        {/* Parties */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold mb-2">Wykonawca</p>
            <p className="text-sm font-semibold text-white">Aurine Agency</p>
            <p className="text-xs text-zinc-400 mt-1">{data.agencyEmail || "kontakt@aurine.pl"}</p>
            {data.agencyAddress && <p className="text-xs text-zinc-400">{data.agencyAddress}</p>}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold mb-2">Zleceniodawca</p>
            <p className="text-sm font-semibold text-white">{data.clientName || "—"}</p>
            {data.clientOwnerName && <p className="text-xs text-zinc-400 mt-1">Właściciel: {data.clientOwnerName}</p>}
            {data.clientNip && <p className="text-xs text-zinc-400">NIP: {data.clientNip}</p>}
            {data.clientAddress && <p className="text-xs text-zinc-400">{data.clientAddress}</p>}
            {data.clientEmail && <p className="text-xs text-zinc-400">{data.clientEmail}</p>}
            {data.clientPhone && <p className="text-xs text-zinc-400">Tel: {data.clientPhone}</p>}
          </div>
        </div>

        <div className="border-t border-zinc-800/50"></div>

        {/* §1 Przedmiot umowy */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§1. Przedmiot umowy</h2>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            Przedmiotem umowy jest świadczenie usług marketingowych online, obejmujących tworzenie i prowadzenie kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych, optymalizację kampanii oraz comiesięczne raportowanie wyników.
          </p>
          {data.services && data.services.length > 0 && (
            <div className="mt-2">
              <p className="text-[10px] text-zinc-500 mb-1">Usługi objęte umową:</p>
              <ul className="text-[11px] text-zinc-300 list-disc list-inside space-y-0.5">
                {data.services.map((service) => (
                  <li key={service.id}>{service.name}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* §2 Obowiązki Wykonawcy */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§2. Obowiązki Wykonawcy</h2>
          <ul className="text-[11px] text-zinc-300 leading-relaxed list-disc list-inside space-y-0.5">
            <li>Prowadzenie kampanii reklamowych zgodnie z ustalonymi celami biznesowymi</li>
            <li>Przygotowywanie kreacji reklamowych (grafiki, teksty)</li>
            <li>Comiesięczne raportowanie wyników do 7. dnia następnego miesiąca</li>
            <li>Konsultacje i doradztwo w zakresie strategii marketingowej</li>
          </ul>
        </section>

        {/* §3 Obowiązki Zleceniodawcy */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§3. Obowiązki Zleceniodawcy</h2>
          <ul className="text-[11px] text-zinc-300 leading-relaxed list-disc list-inside space-y-0.5">
            <li>Udostępnienie dostępu do fanpage i konta reklamowego</li>
            <li>Dostarczenie materiałów (zdjęcia, opisy, logo)</li>
            <li>Akceptacja kreacji reklamowych w terminie 3 dni roboczych</li>
            <li>Terminowe regulowanie płatności zgodnie z umową</li>
          </ul>
        </section>

        {/* §4 Wynagrodzenie */}
        <section className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800/50">
          <h2 className="text-xs font-bold text-pink-400 mb-2">§4. Wynagrodzenie i budżet reklamowy</h2>
          <div className="text-[11px] text-zinc-300 leading-relaxed space-y-1">
            <p><span className="text-white font-medium">Wynagrodzenie miesięczne:</span> {formatAmount(data.contractValue)} PLN brutto</p>
            {data.paymentType === "split" ? (
              <>
                <p><span className="text-zinc-400">Zaliczka:</span> {formatAmount(data.advanceAmount)} PLN płatna w terminie 3 dni od zawarcia umowy</p>
                <p><span className="text-zinc-400">Pozostała część:</span> {formatAmount(remainingValue)} PLN płatna do 7. dnia następnego miesiąca</p>
              </>
            ) : (
              <p><span className="text-zinc-400">Płatność:</span> Całość wynagrodzenia płatna z góry w terminie 3 dni od zawarcia umowy</p>
            )}
            <p className="mt-2 pt-2 border-t border-zinc-800/50">
              <span className="text-zinc-400">Budżet reklamowy:</span> Opłacany bezpośrednio przez Zleceniodawcę do platformy reklamowej (Meta). Nie stanowi części wynagrodzenia Wykonawcy.
            </p>
          </div>
        </section>

        {/* §5 Prawa autorskie */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§5. Prawa autorskie i własność</h2>
          <ul className="text-[11px] text-zinc-300 leading-relaxed list-disc list-inside space-y-0.5">
            <li>Materiały reklamowe stworzone przez Wykonawcę podlegają ochronie prawnoautorskiej</li>
            <li><span className="text-white font-medium">Konto reklamowe oraz wyniki kampanii są własnością Zleceniodawcy</span></li>
          </ul>
        </section>

        {/* §6 Okres obowiązywania */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§6. Okres obowiązywania i wypowiedzenie</h2>
          <ul className="text-[11px] text-zinc-300 leading-relaxed list-disc list-inside space-y-0.5">
            <li>Umowa obowiązuje od dnia wpłaty zaliczki/wynagrodzenia</li>
            <li><span className="text-white font-medium">Umowa może zostać rozwiązana z zachowaniem 30-dniowego okresu wypowiedzenia</span></li>
          </ul>
        </section>

        {/* §7 Kary umowne */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§7. Kary umowne</h2>
          <ul className="text-[11px] text-zinc-300 leading-relaxed list-disc list-inside space-y-0.5">
            <li><span className="text-zinc-400">Opóźnienie płatności:</span> odsetki w wysokości 0,5% wartości zaległej kwoty za każdy dzień zwłoki</li>
            <li><span className="text-zinc-400">Niedotrzymanie terminów:</span> kara umowna w wysokości 2% miesięcznej wartości umowy</li>
            <li>Prawo do rozwiązania umowy w trybie natychmiastowym przy opóźnieniu płatności powyżej 14 dni</li>
          </ul>
        </section>

        {/* §8 Odpowiedzialność */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§8. Odpowiedzialność</h2>
          <ul className="text-[11px] text-zinc-300 leading-relaxed list-disc list-inside space-y-0.5">
            <li><span className="text-white font-medium">Wykonawca nie gwarantuje określonego poziomu wyników kampanii reklamowych</span></li>
            <li>Wyniki kampanii zależą od wielu czynników zewnętrznych niezależnych od Wykonawcy</li>
          </ul>
        </section>

        {/* §9 RODO */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§9. Ochrona danych osobowych (RODO)</h2>
          <ul className="text-[11px] text-zinc-300 leading-relaxed list-disc list-inside space-y-0.5">
            <li><span className="text-white font-medium">Strony zobowiązują się do przetwarzania danych osobowych zgodnie z RODO</span></li>
            <li>Dane osobowe będą wykorzystywane wyłącznie w celu realizacji niniejszej umowy</li>
          </ul>
        </section>

        {/* §10 Postanowienia końcowe */}
        <section>
          <h2 className="text-xs font-bold text-pink-400 mb-2">§10. Postanowienia końcowe</h2>
          <ul className="text-[11px] text-zinc-300 leading-relaxed list-disc list-inside space-y-0.5">
            <li>W sprawach nieuregulowanych niniejszą umową zastosowanie mają przepisy Kodeksu cywilnego</li>
            <li>Umowa została sporządzona w formie elektronicznej, co jest wystarczające dla jej ważności</li>
            <li>Wszelkie zmiany umowy wymagają formy pisemnej pod rygorem nieważności</li>
          </ul>
        </section>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 pt-8 mt-4 border-t border-zinc-800/50">
          <div className="text-center">
            <div className="h-16 border-b border-zinc-700 mb-2"></div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">Zleceniodawca</p>
            <p className="text-xs text-zinc-400 mt-0.5">{data.clientOwnerName || data.clientName || "—"}</p>
          </div>
          <div className="text-center">
            <div className="h-16 border-b border-zinc-700 mb-2"></div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">Wykonawca</p>
            <p className="text-xs text-zinc-400 mt-0.5">Aurine Agency</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-10 py-4 border-t border-zinc-900 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-60" />
          <span className="text-[10px] text-zinc-600">aurine.pl</span>
        </div>
        <p className="text-[10px] text-zinc-600">
          Profesjonalny marketing dla salonów beauty
        </p>
      </div>
    </div>
  );
};
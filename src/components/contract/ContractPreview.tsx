import { FileText, Calendar, User, Building2, Shield, CheckCircle2, Sparkles, Flower2, AlertTriangle } from "lucide-react";
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

const formatAmount = (amount: string) => {
  if (!amount) return "0";
  const num = parseFloat(amount);
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  const totalValue = parseFloat(data.contractValue) || 0;
  const advanceValue = data.paymentType === "split" ? (parseFloat(data.advanceAmount) || 0) : 0;
  const remainingValue = data.paymentType === "split" ? totalValue - advanceValue : 0;

  return (
    <div
      id="contract-preview"
      className="w-[794px] h-[1123px] bg-black text-white overflow-hidden flex flex-col"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-black px-5 py-4 border-b border-pink-900/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={agencyLogo} 
              alt="Aurine" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-500 font-light">
                Aurine Agency
              </p>
              <p className="text-base font-semibold text-white">
                Umowa Współpracy
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex flex-col items-end gap-0.5 px-4 py-2 rounded-xl bg-gradient-to-br from-pink-600 to-rose-700 shadow-lg shadow-pink-500/20">
              <span className="text-[7px] uppercase tracking-[0.2em] text-pink-100 font-light">
                Data zawarcia
              </span>
              <p className="text-sm font-bold text-white">
                {formatDate(data.signDate)}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-zinc-400">
          Miejscowość: <span className="text-white font-medium">{data.signCity || "—"}</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5 py-3 space-y-2.5 overflow-hidden">
        {/* Parties Section */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-pink-950/30 via-zinc-950/50 to-zinc-950/50 rounded-xl border border-pink-800/20 p-3 backdrop-blur">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-7 h-7 rounded-lg flex items-center justify-center shadow-md shadow-pink-500/30">
                <Building2 className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-wider text-pink-300 font-medium">Wykonawca</p>
                <h4 className="text-xs font-semibold text-white">Aurine Agency</h4>
              </div>
            </div>
            <div className="space-y-0.5 text-[8px] text-zinc-400">
              <p>{data.agencyAddress || "Adres do korespondencji"}</p>
              <p>E-mail: {data.agencyEmail || "kontakt@aurine.pl"}</p>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-xl border border-zinc-800/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-7 h-7 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/30">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-wider text-zinc-500 font-medium">Zleceniodawca</p>
                <h4 className="text-xs font-semibold text-white">{data.clientName || "Nazwa firmy"}</h4>
              </div>
            </div>
            <div className="space-y-0.5 text-[8px] text-zinc-400">
              {data.clientOwnerName && <p><span className="text-zinc-500">Właściciel:</span> {data.clientOwnerName}</p>}
              {data.clientNip && <p><span className="text-zinc-500">NIP:</span> {data.clientNip}</p>}
              <p>{data.clientAddress || "Adres klienta"}</p>
              {data.clientEmail && <p><span className="text-zinc-500">E-mail:</span> {data.clientEmail}</p>}
              {data.clientPhone && <p><span className="text-zinc-500">Tel:</span> {data.clientPhone}</p>}
            </div>
          </div>
        </div>

        {/* Contract Value & Services */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-purple-950/30 via-zinc-950/50 to-zinc-950/50 rounded-xl border border-purple-800/20 p-3 backdrop-blur">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-7 h-7 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-wider text-purple-300 font-medium">Wynagrodzenie miesięczne</p>
                <p className="text-lg font-bold text-white">{formatAmount(data.contractValue)} PLN</p>
              </div>
            </div>
            <div className="text-[8px] text-zinc-400 space-y-0.5">
              {data.paymentType === "split" ? (
                <>
                  <p><span className="text-purple-300">Zaliczka:</span> {formatAmount(data.advanceAmount)} PLN</p>
                  <p><span className="text-purple-300">Pozostała część:</span> {formatAmount(remainingValue.toString())} PLN</p>
                </>
              ) : (
                <p><span className="text-purple-300">Płatność:</span> Całość z góry</p>
              )}
            </div>
          </div>

          <div className="bg-zinc-950/80 rounded-xl border border-zinc-800/50 p-3">
            <h3 className="text-pink-400 font-bold text-[9px] mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Usługi objęte umową
            </h3>
            <ul className="text-[8px] text-zinc-400 space-y-0.5 list-disc list-inside">
              {data.services && data.services.length > 0 ? (
                data.services.map((service) => (
                  <li key={service.id}>{service.name}</li>
                ))
              ) : (
                <>
                  <li>Kampanie Facebook Ads</li>
                  <li>Materiały reklamowe</li>
                  <li>Optymalizacja i raportowanie</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Contract Paragraphs */}
        <div className="space-y-2">
          {/* §1 */}
          <div className="bg-zinc-950/80 rounded-lg border border-zinc-800/50 p-2">
            <h3 className="text-pink-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-pink-500/20 flex items-center justify-center text-[7px]">§1</span>
              Przedmiot umowy
            </h3>
            <p className="text-[7px] text-zinc-400 leading-relaxed">
              Przedmiotem umowy jest świadczenie usług marketingowych online, w tym: tworzenie i prowadzenie kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych (grafik, tekstów), optymalizacja kampanii, comiesięczne raportowanie wyników oraz doradztwo marketingowe.
            </p>
          </div>

          {/* §2 & §3 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-950/80 rounded-lg border border-zinc-800/50 p-2">
              <h3 className="text-pink-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-pink-500/20 flex items-center justify-center text-[7px]">§2</span>
                Obowiązki Wykonawcy
              </h3>
              <ul className="text-[7px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Prowadzenie kampanii zgodnie z celami biznesowymi</li>
                <li>Przygotowywanie kreacji reklamowych</li>
                <li>Miesięczne raporty do 7. dnia następnego miesiąca</li>
              </ul>
            </div>

            <div className="bg-zinc-950/80 rounded-lg border border-zinc-800/50 p-2">
              <h3 className="text-pink-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-pink-500/20 flex items-center justify-center text-[7px]">§3</span>
                Obowiązki Zleceniodawcy
              </h3>
              <ul className="text-[7px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Dostęp do fanpage i konta reklamowego</li>
                <li>Materiały (zdjęcia, opisy, logo)</li>
                <li>Akceptacja kreacji w 3 dni robocze</li>
              </ul>
            </div>
          </div>

          {/* §4 - Payment */}
          <div className="bg-gradient-to-br from-emerald-950/30 via-zinc-950/60 to-zinc-950/50 rounded-lg border border-emerald-800/30 p-2">
            <h3 className="text-emerald-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center text-[7px]">§4</span>
              Wynagrodzenie i budżet reklamowy
            </h3>
            <div className="text-[7px] text-zinc-400 leading-relaxed space-y-0.5">
              {data.paymentType === "split" ? (
                <>
                  <p><strong className="text-emerald-300">Zaliczka:</strong> {formatAmount(data.advanceAmount)} PLN płatna w terminie 3 dni od zawarcia umowy</p>
                  <p><strong className="text-emerald-300">Pozostała część:</strong> {formatAmount(remainingValue.toString())} PLN płatna w 7 dni od zakończenia miesiąca</p>
                </>
              ) : (
                <p><strong className="text-emerald-300">Płatność:</strong> Całość wynagrodzenia ({formatAmount(data.contractValue)} PLN) płatna z góry w terminie 3 dni od zawarcia umowy</p>
              )}
              <p><strong className="text-emerald-300">Budżet reklamowy:</strong> Opłacany przez Zleceniodawcę bezpośrednio do platformy reklamowej (Meta). Nie jest częścią wynagrodzenia Wykonawcy.</p>
            </div>
          </div>

          {/* §5 & §6 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-950/80 rounded-lg border border-zinc-800/50 p-2">
              <h3 className="text-pink-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-pink-500/20 flex items-center justify-center text-[7px]">§5</span>
                Prawa autorskie
              </h3>
              <ul className="text-[7px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Materiały podlegają ochronie prawnoautorskiej</li>
                <li><strong className="text-pink-300">Konto reklamowe i wyniki są własnością Zleceniodawcy</strong></li>
              </ul>
            </div>

            <div className="bg-zinc-950/80 rounded-lg border border-zinc-800/50 p-2">
              <h3 className="text-pink-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-pink-500/20 flex items-center justify-center text-[7px]">§6</span>
                Okres obowiązywania
              </h3>
              <ul className="text-[7px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Od dnia wpłaty zaliczki/wynagrodzenia</li>
                <li><strong className="text-pink-300">Wypowiedzenie z 30-dniowym okresem</strong></li>
              </ul>
            </div>
          </div>

          {/* §7 - Penalties & §8 - Liability */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-amber-950/30 via-zinc-950/60 to-zinc-950/50 rounded-lg border border-amber-800/30 p-2">
              <h3 className="text-amber-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-amber-500/20 flex items-center justify-center text-[7px]">§7</span>
                Kary umowne
              </h3>
              <ul className="text-[7px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li><strong className="text-amber-300">Opóźnienie płatności:</strong> 0,5% za każdy dzień</li>
                <li><strong className="text-amber-300">Niedotrzymanie terminów:</strong> 2% wartości umowy</li>
                <li>Rozwiązanie przy opóźnieniu &gt;14 dni</li>
              </ul>
            </div>

            <div className="bg-zinc-950/80 rounded-lg border border-zinc-800/50 p-2">
              <h3 className="text-pink-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-pink-500/20 flex items-center justify-center text-[7px]">§8</span>
                Odpowiedzialność
              </h3>
              <ul className="text-[7px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li><strong className="text-pink-300">Wykonawca nie gwarantuje określonego poziomu wyników</strong></li>
                <li>Wyniki zależą od czynników zewnętrznych</li>
              </ul>
            </div>
          </div>

          {/* §9 & §10 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-blue-950/30 via-zinc-950/60 to-zinc-950/50 rounded-lg border border-blue-800/30 p-2">
              <h3 className="text-blue-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center text-[7px]">§9</span>
                Ochrona danych (RODO)
              </h3>
              <ul className="text-[7px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li><strong className="text-blue-300">Strony zobowiązują się do przetwarzania danych zgodnie z RODO</strong></li>
                <li>Dane wykorzystywane wyłącznie w celu realizacji umowy</li>
              </ul>
            </div>

            <div className="bg-zinc-950/80 rounded-lg border border-zinc-800/50 p-2">
              <h3 className="text-pink-400 font-bold text-[9px] mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-pink-500/20 flex items-center justify-center text-[7px]">§10</span>
                Postanowienia końcowe
              </h3>
              <ul className="text-[7px] text-zinc-400 leading-relaxed list-disc list-inside space-y-0.5">
                <li>Zastosowanie Kodeksu cywilnego</li>
                <li>Forma elektroniczna wystarczająca</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="h-10 border-b border-zinc-700 mb-1"></div>
            <p className="text-[8px] text-zinc-500 uppercase tracking-wider">Zleceniodawca</p>
            <p className="text-[8px] text-zinc-400">{data.clientOwnerName || data.clientName || "—"}</p>
          </div>
          <div className="text-center">
            <div className="h-10 border-b border-zinc-700 mb-1"></div>
            <p className="text-[8px] text-zinc-500 uppercase tracking-wider">Wykonawca</p>
            <p className="text-[8px] text-zinc-400">Aurine Agency</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={agencyLogo} alt="Aurine" className="w-5 h-5 object-contain opacity-60" />
          <div className="flex items-center gap-1.5">
            <Flower2 className="w-2.5 h-2.5 text-pink-500/50" />
            <span className="text-[7px] text-zinc-600">aurine.pl</span>
          </div>
        </div>
        <p className="text-[7px] text-zinc-600">
          Profesjonalny marketing dla salonów beauty
        </p>
      </div>
    </div>
  );
};
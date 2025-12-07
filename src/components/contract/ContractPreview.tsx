import { FileText, Building2, User, Shield, Scale, AlertTriangle, Clock, CreditCard, Lock, Scroll } from "lucide-react";
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
                Wynagrodzenie
              </span>
              <p className="text-2xl font-bold text-white">
                {formatAmount(data.contractValue)} PLN
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {data.clientName || "Nazwa Klienta"}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {data.signCity || "Miejscowość"} • {formatDate(data.signDate)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-4">
        {/* Parties Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-pink-950/30 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-pink-800/20 p-4 backdrop-blur shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-pink-300 font-semibold">Wykonawca</span>
            </div>
            <p className="text-sm font-semibold text-white">Aurine Agency</p>
            <p className="text-xs text-zinc-400 mt-1">{data.agencyEmail || "kontakt@aurine.pl"}</p>
            {data.agencyAddress && <p className="text-xs text-zinc-400">{data.agencyAddress}</p>}
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 via-zinc-950/50 to-zinc-950/50 rounded-2xl border border-blue-800/20 p-4 backdrop-blur shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold">Zleceniodawca</span>
            </div>
            <p className="text-sm font-semibold text-white">{data.clientName || "—"}</p>
            {data.clientOwnerName && <p className="text-xs text-zinc-400 mt-1">Właściciel: {data.clientOwnerName}</p>}
            {data.clientNip && <p className="text-xs text-zinc-400">NIP: {data.clientNip}</p>}
            {data.clientAddress && <p className="text-xs text-zinc-400">{data.clientAddress}</p>}
            {data.clientEmail && <p className="text-xs text-zinc-400">{data.clientEmail}</p>}
            {data.clientPhone && <p className="text-xs text-zinc-400">Tel: {data.clientPhone}</p>}
          </div>
        </div>

        {/* §1 Przedmiot umowy */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
              <FileText className="w-3 h-3 text-pink-400" />
            </div>
            <h2 className="text-xs font-bold text-pink-400">§1. Przedmiot umowy</h2>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed mb-3">
            Przedmiotem umowy jest świadczenie usług marketingowych online, obejmujących tworzenie i prowadzenie kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych, optymalizację kampanii oraz comiesięczne raportowanie wyników.
          </p>
          {data.services && data.services.length > 0 && (
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/30">
              <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-2">Usługi objęte umową</p>
              <div className="grid grid-cols-2 gap-1">
                {data.services.map((service) => (
                  <div key={service.id} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    <span className="text-[10px] text-zinc-300">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* §2-3 Obowiązki stron - 2 columns */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Shield className="w-3 h-3 text-emerald-400" />
              </div>
              <h2 className="text-xs font-bold text-emerald-400">§2. Obowiązki Wykonawcy</h2>
            </div>
            <div className="space-y-1.5">
              {[
                "Prowadzenie kampanii reklamowych",
                "Przygotowywanie kreacji reklamowych",
                "Comiesięczne raportowanie wyników",
                "Konsultacje marketingowe"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-[10px] text-zinc-400">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <User className="w-3 h-3 text-blue-400" />
              </div>
              <h2 className="text-xs font-bold text-blue-400">§3. Obowiązki Zleceniodawcy</h2>
            </div>
            <div className="space-y-1.5">
              {[
                "Dostęp do fanpage i konta reklamowego",
                "Dostarczenie materiałów (zdjęcia, logo)",
                "Akceptacja kreacji w 3 dni robocze",
                "Terminowe regulowanie płatności"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                  <span className="text-[10px] text-zinc-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* §4 Wynagrodzenie - highlighted */}
        <div className="bg-gradient-to-br from-pink-950/40 via-zinc-950/60 to-zinc-950/50 rounded-2xl border border-pink-800/30 p-4 backdrop-blur shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-pink-400">§4. Wynagrodzenie i budżet reklamowy</h2>
              <p className="text-[9px] text-pink-300">Warunki finansowe współpracy</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/30">
              <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Miesięcznie</p>
              <p className="text-lg font-bold text-white">{formatAmount(data.contractValue)} PLN</p>
            </div>
            {data.paymentType === "split" ? (
              <>
                <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/30">
                  <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Zaliczka</p>
                  <p className="text-lg font-bold text-pink-400">{formatAmount(data.advanceAmount)} PLN</p>
                </div>
                <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/30">
                  <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Pozostała część</p>
                  <p className="text-lg font-bold text-zinc-300">{formatAmount(remainingValue)} PLN</p>
                </div>
              </>
            ) : (
              <div className="col-span-2 bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/30">
                <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Płatność</p>
                <p className="text-sm font-semibold text-zinc-300">Całość z góry w terminie 3 dni</p>
              </div>
            )}
          </div>
          <p className="text-[10px] text-zinc-500 italic">
            Budżet reklamowy opłaca Zleceniodawca bezpośrednio do platformy reklamowej (Meta). Nie stanowi wynagrodzenia Wykonawcy.
          </p>
        </div>

        {/* §5-6-7 Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-3.5 h-3.5 text-purple-400" />
              <h2 className="text-[10px] font-bold text-purple-400">§5. Prawa autorskie</h2>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-zinc-400">• Materiały podlegają ochronie prawnoautorskiej</p>
              <p className="text-[9px] text-white font-medium">• Konto i wyniki są własnością Zleceniodawcy</p>
            </div>
          </div>

          <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <h2 className="text-[10px] font-bold text-amber-400">§6. Okres i wypowiedzenie</h2>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-zinc-400">• Obowiązuje od wpłaty zaliczki</p>
              <p className="text-[9px] text-white font-medium">• 30-dniowy okres wypowiedzenia</p>
            </div>
          </div>

          <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <h2 className="text-[10px] font-bold text-red-400">§7. Kary umowne</h2>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-zinc-400">• Opóźnienie: 0,5%/dzień</p>
              <p className="text-[9px] text-zinc-400">• Niedotrzymanie terminów: 2%</p>
              <p className="text-[9px] text-zinc-400">• Rozwiązanie po 14 dni zwłoki</p>
            </div>
          </div>
        </div>

        {/* §8-9-10 Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              <h2 className="text-[10px] font-bold text-orange-400">§8. Odpowiedzialność</h2>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-white font-medium">• Brak gwarancji wyników kampanii</p>
              <p className="text-[9px] text-zinc-400">• Wyniki zależą od czynników zewnętrznych</p>
            </div>
          </div>

          <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <h2 className="text-[10px] font-bold text-cyan-400">§9. RODO</h2>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-white font-medium">• Przetwarzanie zgodne z RODO</p>
              <p className="text-[9px] text-zinc-400">• Dane tylko do realizacji umowy</p>
            </div>
          </div>

          <div className="bg-zinc-950/50 rounded-xl border border-zinc-800/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Scroll className="w-3.5 h-3.5 text-zinc-400" />
              <h2 className="text-[10px] font-bold text-zinc-400">§10. Postanowienia końcowe</h2>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-zinc-400">• Stosuje się przepisy KC</p>
              <p className="text-[9px] text-zinc-400">• Zmiany wymagają formy pisemnej</p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 pt-4">
          <div className="text-center">
            <div className="h-12 border-b border-zinc-700 mb-2"></div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">Zleceniodawca</p>
            <p className="text-xs text-zinc-400 mt-0.5">{data.clientOwnerName || data.clientName || "—"}</p>
          </div>
          <div className="text-center">
            <div className="h-12 border-b border-zinc-700 mb-2"></div>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">Wykonawca</p>
            <p className="text-xs text-zinc-400 mt-0.5">Aurine Agency</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
          <span className="text-xs text-zinc-600">aurine.pl</span>
        </div>
        <p className="text-[10px] text-zinc-600">
          Profesjonalny marketing dla salonów beauty
        </p>
      </div>
    </div>
  );
};
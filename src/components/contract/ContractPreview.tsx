import { Building2, FileText, Calendar, Shield, CheckCircle2, Sparkles } from "lucide-react";

interface ContractData {
  clientName: string;
  clientAddress: string;
  clientNIP: string;
  contractNumber: string;
  signDate: string;
  serviceScope: string;
  contractValue: string;
  paymentTerms: string;
  contractDuration: string;
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
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  return (
    <div
      id="contract-preview"
      className="bg-white text-zinc-900 w-[794px] min-h-[1123px] p-10 mx-auto font-sans"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-6 pb-6 border-b-2 border-pink-500">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Aurine Agency</h1>
            <p className="text-sm text-zinc-500">Marketing dla salonów beauty</p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            <FileText className="w-4 h-4" />
            <span className="font-bold text-sm">UMOWA</span>
          </div>
          <p className="text-lg font-bold mt-2 text-zinc-900">{data.contractNumber || "UM/____/____"}</p>
        </div>
      </header>

      {/* Title */}
      <section className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">UMOWA O ŚWIADCZENIE USŁUG MARKETINGOWYCH</h2>
        <p className="text-zinc-500">zawarta w dniu {formatDate(data.signDate)}</p>
      </section>

      {/* Parties */}
      <section className="mb-6">
        <p className="text-sm text-zinc-600 leading-relaxed mb-4">pomiędzy:</p>
        
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-200 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-pink-500 flex items-center justify-center">
              <Building2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Zleceniobiorca (Agencja)</span>
          </div>
          <p className="font-bold text-zinc-900">Aurine Agency</p>
          <p className="text-sm text-zinc-600">ul. Przykładowa 123, 00-000 Warszawa</p>
          <p className="text-sm text-zinc-600">NIP: 1234567890</p>
        </div>

        <p className="text-sm text-zinc-600 mb-4 text-center">a</p>

        <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-zinc-700 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Zleceniodawca (Klient)</span>
          </div>
          <p className="font-bold text-zinc-900">{data.clientName || "Nazwa salonu"}</p>
          <p className="text-sm text-zinc-600">{data.clientAddress || "Adres klienta"}</p>
          {data.clientNIP && <p className="text-sm text-zinc-600">NIP: {data.clientNIP}</p>}
        </div>
      </section>

      {/* Contract terms */}
      <section className="space-y-4 mb-6 text-sm text-zinc-700 leading-relaxed">
        <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
          <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">§1</span>
            Przedmiot umowy
          </h3>
          <p>Zleceniobiorca zobowiązuje się do świadczenia na rzecz Zleceniodawcy usług marketingowych obejmujących:</p>
          <div className="mt-3 bg-white rounded-lg p-4 border border-zinc-200">
            <p className="font-medium text-zinc-900">{data.serviceScope || "Kampanie reklamowe Facebook Ads dla salonu beauty"}</p>
          </div>
        </div>

        <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
          <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">§2</span>
            Czas trwania umowy
          </h3>
          <p>Umowa zostaje zawarta na okres: <span className="font-bold text-pink-600">{data.contractDuration || "3 miesiące"}</span>, licząc od dnia podpisania.</p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-200">
          <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">§3</span>
            Wynagrodzenie
          </h3>
          <p className="mb-2">Za wykonanie usług określonych w §1, Zleceniodawca zobowiązuje się zapłacić Zleceniobiorcy wynagrodzenie w wysokości:</p>
          <div className="bg-white rounded-lg p-4 border border-pink-200 flex items-center justify-between">
            <span className="text-zinc-600">Wartość umowy:</span>
            <span className="text-2xl font-bold text-pink-600">{formatAmount(data.contractValue)} PLN</span>
          </div>
          <p className="mt-3 text-xs text-zinc-500">Płatność: {data.paymentTerms || "7 dni od wystawienia faktury"}</p>
        </div>

        <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
          <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">§4</span>
            Obowiązki stron
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-zinc-900 mb-2 text-xs uppercase tracking-wider">Zleceniobiorca:</p>
              <ul className="space-y-1 text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span>Profesjonalna obsługa kampanii</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span>Comiesięczne raporty z wyników</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span>Optymalizacja i testy A/B</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-zinc-900 mb-2 text-xs uppercase tracking-wider">Zleceniodawca:</p>
              <ul className="space-y-1 text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Terminowe płatności</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Dostarczanie materiałów</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Dostęp do konta reklamowego</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
          <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">§5</span>
            Poufność i RODO
          </h3>
          <p className="text-xs">Strony zobowiązują się do zachowania w poufności wszelkich informacji uzyskanych w związku z realizacją niniejszej umowy. Przetwarzanie danych osobowych odbywa się zgodnie z RODO.</p>
        </div>

        <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
          <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">§6</span>
            Postanowienia końcowe
          </h3>
          <p className="text-xs">W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy Kodeksu Cywilnego. Spory rozstrzygane będą przez sąd właściwy dla siedziby Zleceniobiorcy. Umowę sporządzono w dwóch jednobrzmiących egzemplarzach.</p>
        </div>
      </section>

      {/* Signatures */}
      <footer className="flex justify-between items-end pt-8 mt-8 border-t border-zinc-200">
        <div className="text-center">
          <div className="w-48 border-b border-zinc-300 mb-2 h-16"></div>
          <p className="text-xs text-zinc-500 font-medium">Zleceniobiorca</p>
          <p className="text-xs text-zinc-400">Aurine Agency</p>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Shield className="w-5 h-5" />
          <span className="text-xs">Dokument chroniony</span>
        </div>
        <div className="text-center">
          <div className="w-48 border-b border-zinc-300 mb-2 h-16"></div>
          <p className="text-xs text-zinc-500 font-medium">Zleceniodawca</p>
          <p className="text-xs text-zinc-400">{data.clientName || "Klient"}</p>
        </div>
      </footer>
    </div>
  );
};

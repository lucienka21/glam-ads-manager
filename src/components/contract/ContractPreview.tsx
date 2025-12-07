import agencyLogo from "@/assets/agency-logo.png";

interface ContractData {
  clientName: string;
  clientAddress: string;
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
  if (!dateStr) return "……………………";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
};

const formatAmount = (amount: string) => {
  if (!amount) return "…………";
  const num = parseFloat(amount);
  return num.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  return (
    <div
      id="contract-preview"
      className="bg-zinc-950 text-zinc-100 w-[794px] min-h-[1123px] p-8 mx-auto font-sans relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header with Logo */}
      <header className="flex items-center justify-center mb-6 pb-4 border-b border-pink-500/30">
        <img src={agencyLogo} alt="Aurine" className="h-12 object-contain" />
      </header>

      {/* Title */}
      <section className="text-center mb-6">
        <h1 className="text-xl font-bold text-white tracking-wide">
          UMOWA O ŚWIADCZENIE USŁUG MARKETINGOWYCH
        </h1>
        <p className="text-zinc-400 text-sm mt-2">
          zawarta w dniu <span className="text-pink-400 font-medium">{formatDate(data.signDate)}</span> roku 
          w miejscowości <span className="text-pink-400 font-medium">{data.signCity || "……………………"}</span> pomiędzy:
        </p>
      </section>

      {/* Parties */}
      <section className="mb-6 space-y-4">
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
          <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">Zleceniodawcą:</p>
          <p className="text-white font-medium">{data.clientName || "………………………………………………………………………………"}</p>
          <p className="text-zinc-400 text-sm mt-1">adres: {data.clientAddress || "………………………………………………………………………"}</p>
        </div>

        <p className="text-center text-zinc-500 text-sm font-medium">a</p>

        <div className="bg-gradient-to-br from-pink-950/30 to-zinc-900/50 rounded-lg p-4 border border-pink-500/20">
          <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">Wykonawcą:</p>
          <p className="text-white font-medium">Agencja Marketingowa Aurine</p>
          <p className="text-zinc-400 text-sm mt-1">adres do korespondencji: {data.agencyAddress || "……………………………………………"}</p>
          <p className="text-zinc-400 text-sm">e-mail: {data.agencyEmail || "kontakt@aurine.pl"}</p>
        </div>
      </section>

      <p className="text-zinc-400 text-xs leading-relaxed mb-6">
        Strony oświadczają, że niniejsza umowa została zawarta w celu określenia zasad współpracy w zakresie świadczenia 
        usług marketingowych przez Wykonawcę na rzecz Zleceniodawcy, w tym w szczególności świadczenia usług promocyjnych, 
        reklamowych oraz doradztwa marketingowego.
      </p>

      {/* Contract sections */}
      <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
        {/* §1 */}
        <section className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
          <h3 className="text-pink-400 font-bold mb-2">§ 1 Przedmiot umowy</h3>
          <ol className="list-decimal list-outside ml-4 space-y-1">
            <li>Przedmiotem niniejszej umowy jest świadczenie przez Wykonawcę usług marketingowych online na rzecz Zleceniodawcy, w szczególności:
              <ol className="list-[lower-alpha] list-outside ml-4 mt-1 space-y-0.5">
                <li>tworzenie, konfiguracja i prowadzenie kampanii reklamowych w systemie Facebook Ads,</li>
                <li>przygotowanie i publikacja materiałów reklamowych (grafiki, treści, wideo),</li>
                <li>bieżąca optymalizacja i monitorowanie wyników kampanii,</li>
                <li>sporządzanie raportów z prowadzonych działań marketingowych,</li>
                <li>doradztwo w zakresie działań reklamowych i komunikacji marketingowej.</li>
              </ol>
            </li>
            <li>Usługi świadczone będą w oparciu o informacje, materiały i dostęp do kont reklamowych, które Zleceniodawca zobowiązuje się udostępnić Wykonawcy.</li>
            <li>Wykonawca zobowiązuje się realizować powierzone zadania z należytą starannością, zgodnie z najlepszą praktyką marketingową.</li>
          </ol>
        </section>

        {/* §2 */}
        <section className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
          <h3 className="text-pink-400 font-bold mb-2">§ 2 Obowiązki wykonawcy</h3>
          <ol className="list-decimal list-outside ml-4 space-y-1">
            <li>Wykonawca zobowiązuje się do:
              <ol className="list-[lower-alpha] list-outside ml-4 mt-1 space-y-0.5">
                <li>prowadzenia kampanii reklamowych zgodnie z celami ustalonymi ze Zleceniodawcą,</li>
                <li>przygotowywania propozycji kreacji reklamowych (grafik, treści, wideo),</li>
                <li>bieżącej optymalizacji ustawień kampanii, aby zwiększyć skuteczność działań,</li>
                <li>przekazywania Zleceniodawcy raportu z wyników kampanii raz w miesiącu, nie później niż do 7. dnia roboczego następnego miesiąca,</li>
                <li>udzielania konsultacji i rekomendacji dotyczących działań marketingowych online.</li>
              </ol>
            </li>
            <li>Wykonawca ma prawo korzystać z podwykonawców (np. grafików, copywriterów), przy czym ponosi pełną odpowiedzialność za ich działania wobec Zleceniodawcy.</li>
            <li>Wykonawca realizuje działania marketingowe z należytą starannością, zgodnie z aktualną wiedzą i praktyką rynkową, przy czym nie gwarantuje osiągnięcia określonych wyników finansowych, sprzedażowych czy frekwencyjnych, ponieważ zależą one od czynników zewnętrznych, niezależnych od Wykonawcy.</li>
            <li>Wykonawca zobowiązuje się do zachowania w poufności wszelkich informacji uzyskanych od Zleceniodawcy w związku z realizacją niniejszej umowy, także po jej zakończeniu.</li>
          </ol>
        </section>

        {/* §3 */}
        <section className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
          <h3 className="text-pink-400 font-bold mb-2">§ 3 Obowiązki zleceniodawcy</h3>
          <ol className="list-decimal list-outside ml-4 space-y-1">
            <li>Zleceniodawca zobowiązuje się do:
              <ol className="list-[lower-alpha] list-outside ml-4 mt-1 space-y-0.5">
                <li>udostępnienia Wykonawcy dostępu do fanpage na Facebooku oraz konta reklamowego w systemie Meta Ads Manager,</li>
                <li>przekazania niezbędnych materiałów (np. zdjęć, opisów usług, logo, informacji o promocjach),</li>
                <li>akceptowania lub odrzucania propozycji kreacji reklamowych w terminie 3 dni roboczych od ich doręczenia. Brak odpowiedzi w tym terminie uznaje się za akceptację,</li>
                <li>przekazywania informacji o zmianach w ofercie lub działalności, które mogą mieć wpływ na prowadzone kampanie,</li>
                <li>terminowego uiszczania ustalonego wynagrodzenia.</li>
              </ol>
            </li>
            <li>Zleceniodawca ponosi odpowiedzialność za zgodność z prawem oraz prawdziwość materiałów i treści dostarczonych Wykonawcy.</li>
          </ol>
        </section>

        {/* §4 */}
        <section className="bg-gradient-to-br from-pink-950/20 to-zinc-900/30 rounded-lg p-4 border border-pink-500/20">
          <h3 className="text-pink-400 font-bold mb-2">§ 4 Wynagrodzenie</h3>
          <ol className="list-decimal list-outside ml-4 space-y-1">
            <li>Za świadczenie usług określonych w niniejszej umowie Zleceniodawca zapłaci Wykonawcy wynagrodzenie w wysokości <span className="text-pink-400 font-bold">{formatAmount(data.contractValue)} zł</span> brutto miesięcznie.</li>
            <li>Zleceniodawca wpłaca zaliczkę w wysokości 50% miesięcznego wynagrodzenia w terminie 3 dni od otrzymania umowy w formie elektronicznej. Po otrzymaniu zaliczki Wykonawca wystawi rachunek na kwotę wpłaconej zaliczki.</li>
            <li>Pozostała część wynagrodzenia (50%) płatna jest w terminie 7 dni od zakończenia obowiązywania umowy, na podstawie rachunku wystawionego przez Wykonawcę na kwotę pozostałą do zapłaty.</li>
            <li>W przypadku opóźnienia w płatności Wykonawca ma prawo wstrzymać świadczenie usług do momentu uregulowania zaległości.</li>
            <li>Budżet reklamowy na kampanie w systemie Meta Ads Manager finansowany jest w całości przez Zleceniodawcę i nie stanowi części wynagrodzenia Wykonawcy. Wykonawca nie ponosi odpowiedzialności za brak efektów kampanii wynikający z niedostatecznego budżetu reklamowego.</li>
          </ol>
        </section>

        {/* §5 */}
        <section className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
          <h3 className="text-pink-400 font-bold mb-2">§ 5 Prawa autorskie</h3>
          <ol className="list-decimal list-outside ml-4 space-y-1">
            <li>Wszelkie materiały reklamowe przygotowane przez Wykonawcę w ramach niniejszej umowy (grafiki, treści reklamowe, materiały wideo itp.) podlegają ochronie prawnoautorskiej.</li>
            <li>Z chwilą uregulowania pełnego wynagrodzenia określonego w § 4, Wykonawca udziela Zleceniodawcy niewyłącznej, bezterminowej licencji na korzystanie z przygotowanych materiałów w celach związanych z działalnością Zleceniodawcy.</li>
            <li>Zleceniodawca nie ma prawa do odsprzedaży, sublicencjonowania ani wykorzystywania materiałów do celów niezwiązanych bezpośrednio z jego działalnością bez uprzedniej zgody Wykonawcy.</li>
            <li>Wykonawca zachowuje prawo do wykorzystywania przygotowanych materiałów w celach marketingowych i promocyjnych własnej agencji (np. jako element portfolio), o ile nie narusza to tajemnicy przedsiębiorstwa Zleceniodawcy.</li>
          </ol>
        </section>

        {/* §6 */}
        <section className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
          <h3 className="text-pink-400 font-bold mb-2">§ 6 Określenie terminów</h3>
          <ol className="list-decimal list-outside ml-4 space-y-1">
            <li>Umowa zostaje zawarta i obowiązuje od dnia dokonania przez Zleceniodawcę wpłaty zaliczki, o której mowa w §4 ust. 2.</li>
            <li>Po upływie pierwszego miesiąca umowa może zostać przedłużona wyłącznie za zgodą obu stron, na warunkach ustalonych w odrębnym aneksie lub w formie potwierdzenia mailowego.</li>
            <li>W przypadku rażącego naruszenia postanowień umowy przez drugą stronę, rozwiązanie może nastąpić ze skutkiem natychmiastowym.</li>
          </ol>
        </section>

        {/* §7 */}
        <section className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
          <h3 className="text-pink-400 font-bold mb-2">§ 7 Rozwiązanie umowy</h3>
          <ol className="list-decimal list-outside ml-4 space-y-1">
            <li>Umowa może zostać rozwiązana przez każdą ze stron z zachowaniem zasad określonych w § 6.</li>
            <li>Wykonawca ma prawo rozwiązać umowę ze skutkiem natychmiastowym, jeżeli:
              <ol className="list-[lower-alpha] list-outside ml-4 mt-1 space-y-0.5">
                <li>Zleceniodawca opóźnia się z płatnością wynagrodzenia o więcej niż 14 dni,</li>
                <li>Zleceniodawca nie przekazuje materiałów lub informacji niezbędnych do prowadzenia kampanii,</li>
                <li>Zleceniodawca narusza obowiązki określone w § 3, uniemożliwiając prawidłowe wykonanie umowy.</li>
              </ol>
            </li>
            <li>Zleceniodawca ma prawo rozwiązać umowę ze skutkiem natychmiastowym, jeżeli Wykonawca rażąco narusza obowiązki określone w § 2.</li>
            <li>Rozwiązanie umowy wymaga formy pisemnej, w tym również w formie elektronicznej (np. poprzez oświadczenie przesłane na adres e-mail wskazany w niniejszej umowie).</li>
          </ol>
        </section>

        {/* §8 */}
        <section className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/50">
          <h3 className="text-pink-400 font-bold mb-2">§ 8 Postanowienia końcowe</h3>
          <ol className="list-decimal list-outside ml-4 space-y-1">
            <li>W sprawach nieuregulowanych niniejszą umową zastosowanie mają przepisy Kodeksu cywilnego.</li>
            <li>Umowa została sporządzona i przekazana w formie elektronicznej (plik PDF) drogą mailową. Strony zgodnie przyjmują, że taka forma jest wystarczająca do jej ważności i wykonywania, a podpisanie umowy nie jest wymagane, jeżeli Zleceniodawca przystąpi do jej realizacji.</li>
          </ol>
        </section>
      </div>

      {/* Signatures */}
      <footer className="flex justify-between items-end pt-8 mt-6">
        <div className="text-center">
          <div className="w-44 border-b border-zinc-600 mb-2 h-12"></div>
          <p className="text-xs text-zinc-500">Zleceniodawca</p>
        </div>
        <div className="text-center">
          <div className="w-44 border-b border-zinc-600 mb-2 h-12"></div>
          <p className="text-xs text-zinc-500">Agencja marketingowa Aurine</p>
        </div>
      </footer>

      {/* Footer branding */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <p className="text-[9px] text-zinc-600">aurine.pl</p>
      </div>
    </div>
  );
};

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

// Contract pages component
const ContractPage = ({ 
  children, 
  pageNumber,
  showHeader = true
}: { 
  children: React.ReactNode; 
  pageNumber: number;
  showHeader?: boolean;
}) => (
  <div
    className="w-[595px] h-[842px] relative overflow-hidden"
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
    <div className="relative h-full flex flex-col p-8">
      {showHeader && (
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
            <img src={agencyLogo} alt="Aurine" className="relative w-8 h-8 object-contain" />
          </div>
          <div>
            <p className="text-sm font-semibold bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
              Aurine
            </p>
          </div>
        </div>
      )}

      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-1.5">
          <img src={agencyLogo} alt="Aurine" className="w-4 h-4 object-contain opacity-50" />
          <span className="text-zinc-600 text-[9px]">aurine.pl</span>
        </div>
        <p className="text-[9px] text-zinc-600">Strona {pageNumber}</p>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className="px-2 py-0.5 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded">
      <span className="text-pink-400 font-semibold text-[10px]">{number}</span>
    </div>
    <span className="text-white font-semibold text-[11px]">{title}</span>
  </div>
);

const Paragraph = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[9px] text-zinc-400 leading-relaxed mb-1.5 ${className}`}>{children}</p>
);

const ListItem = ({ number, children }: { number: string; children: React.ReactNode }) => (
  <div className="flex gap-2 mb-1">
    <span className="text-pink-400 text-[9px] font-medium min-w-[12px]">{number}</span>
    <span className="text-[9px] text-zinc-400 leading-relaxed">{children}</span>
  </div>
);

const SubListItem = ({ letter, children }: { letter: string; children: React.ReactNode }) => (
  <div className="flex gap-2 mb-0.5 ml-4">
    <span className="text-zinc-500 text-[8px] min-w-[10px]">{letter})</span>
    <span className="text-[8px] text-zinc-400 leading-relaxed">{children}</span>
  </div>
);

export const ContractPreview = ({ data }: ContractPreviewProps) => {
  return (
    <div id="contract-preview" className="flex flex-col">
      {/* Page 1 */}
      <ContractPage pageNumber={1} showHeader={false}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
              <img src={agencyLogo} alt="Aurine" className="relative w-12 h-12 object-contain" />
            </div>
            <div>
              <p className="text-lg font-semibold bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                Aurine
              </p>
              <p className="text-[9px] text-zinc-500 tracking-wide">Marketing dla salonów beauty</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-lg">
            <span className="text-white text-sm font-bold tracking-wide">UMOWA O ŚWIADCZENIE USŁUG MARKETINGOWYCH</span>
          </div>
        </div>

        {/* Contract intro */}
        <Paragraph className="text-center mb-4">
          zawarta w dniu <span className="text-pink-300 font-medium">{formatDate(data.signDate)}</span> w miejscowości <span className="text-pink-300 font-medium">{data.signCity || "…………………"}</span> pomiędzy:
        </Paragraph>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">Zleceniodawcą:</p>
            <p className="text-sm font-bold text-white">{data.clientName || "………………………………"}</p>
            <p className="text-[9px] text-zinc-500 mt-1">adres: {data.clientAddress || "………………………………"}</p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 to-fuchsia-500/50 rounded-lg blur-sm opacity-30" />
            <div className="relative bg-zinc-900 border border-pink-500/30 rounded-lg p-3">
              <p className="text-[10px] text-pink-400 uppercase tracking-wider font-semibold mb-2">Wykonawcą:</p>
              <p className="text-sm font-bold text-white">Agencja Marketingowa Aurine</p>
              <p className="text-[9px] text-zinc-500 mt-1">adres: {data.agencyAddress || "………………………………"}</p>
              <p className="text-[9px] text-zinc-500">e-mail: {data.agencyEmail || "kontakt@aurine.pl"}</p>
            </div>
          </div>
        </div>

        <Paragraph className="mb-4 italic text-zinc-500">
          Strony oświadczają, że niniejsza umowa została zawarta w celu określenia zasad współpracy w zakresie świadczenia usług marketingowych przez Wykonawcę na rzecz Zleceniodawcy, w tym w szczególności świadczenia usług promocyjnych, reklamowych oraz doradztwa marketingowego.
        </Paragraph>

        {/* §1 Przedmiot umowy */}
        <div className="mb-4">
          <SectionTitle number="§1" title="Przedmiot umowy" />
          <ListItem number="1.">
            Przedmiotem niniejszej umowy jest świadczenie przez Wykonawcę usług marketingowych online na rzecz Zleceniodawcy, w szczególności:
          </ListItem>
          <SubListItem letter="a">tworzenie, konfiguracja i prowadzenie kampanii reklamowych w systemie Facebook Ads,</SubListItem>
          <SubListItem letter="b">przygotowanie i publikacja materiałów reklamowych (grafiki, treści, wideo),</SubListItem>
          <SubListItem letter="c">bieżąca optymalizacja i monitorowanie wyników kampanii,</SubListItem>
          <SubListItem letter="d">sporządzanie raportów z prowadzonych działań marketingowych,</SubListItem>
          <SubListItem letter="e">doradztwo w zakresie działań reklamowych i komunikacji marketingowej.</SubListItem>
          <ListItem number="2.">
            Usługi świadczone będą w oparciu o informacje, materiały i dostęp do kont reklamowych, które Zleceniodawca zobowiązuje się udostępnić Wykonawcy.
          </ListItem>
          <ListItem number="3.">
            Wykonawca zobowiązuje się realizować powierzone zadania z należytą starannością, zgodnie z najlepszą praktyką marketingową.
          </ListItem>
        </div>
      </ContractPage>

      {/* Page 2 */}
      <ContractPage pageNumber={2}>
        {/* §2 Obowiązki Wykonawcy */}
        <div className="mb-4">
          <SectionTitle number="§2" title="Obowiązki Wykonawcy" />
          <ListItem number="1.">Wykonawca zobowiązuje się do:</ListItem>
          <SubListItem letter="a">prowadzenia kampanii reklamowych zgodnie z celami ustalonymi ze Zleceniodawcą,</SubListItem>
          <SubListItem letter="b">przygotowywania propozycji kreacji reklamowych (grafik, treści, wideo),</SubListItem>
          <SubListItem letter="c">bieżącej optymalizacji ustawień kampanii, aby zwiększyć skuteczność działań,</SubListItem>
          <SubListItem letter="d">przekazywania Zleceniodawcy raportu z wyników kampanii raz w miesiącu, nie później niż do 7. dnia roboczego następnego miesiąca,</SubListItem>
          <SubListItem letter="e">udzielania konsultacji i rekomendacji dotyczących działań marketingowych online.</SubListItem>
          <ListItem number="2.">
            Wykonawca ma prawo korzystać z podwykonawców (np. grafików, copywriterów), przy czym ponosi pełną odpowiedzialność za ich działania wobec Zleceniodawcy.
          </ListItem>
          <ListItem number="3.">
            Wykonawca realizuje działania marketingowe z należytą starannością, zgodnie z aktualną wiedzą i praktyką rynkową, przy czym nie gwarantuje osiągnięcia określonych wyników finansowych, sprzedażowych czy frekwencyjnych, ponieważ zależą one od czynników zewnętrznych, niezależnych od Wykonawcy.
          </ListItem>
          <ListItem number="4.">
            Wykonawca zobowiązuje się do zachowania w poufności wszelkich informacji uzyskanych od Zleceniodawcy w związku z realizacją niniejszej umowy, także po jej zakończeniu.
          </ListItem>
        </div>

        {/* §3 Obowiązki Zleceniodawcy */}
        <div className="mb-4">
          <SectionTitle number="§3" title="Obowiązki Zleceniodawcy" />
          <ListItem number="1.">Zleceniodawca zobowiązuje się do:</ListItem>
          <SubListItem letter="a">udostępnienia Wykonawcy dostępu do fanpage na Facebooku oraz konta reklamowego w systemie Meta Ads Manager,</SubListItem>
          <SubListItem letter="b">przekazania niezbędnych materiałów (np. zdjęć, opisów usług, logo, informacji o promocjach),</SubListItem>
          <SubListItem letter="c">akceptuje lub odrzuca propozycje kreacji reklamowych w terminie 3 dni roboczych od ich doręczenia. Brak odpowiedzi w tym terminie uznaje się za akceptację,</SubListItem>
          <SubListItem letter="d">przekazywania informacji o zmianach w ofercie lub działalności, które mogą mieć wpływ na prowadzone kampanie,</SubListItem>
          <SubListItem letter="e">terminowego uiszczania ustalonego wynagrodzenia.</SubListItem>
          <ListItem number="2.">
            Zleceniodawca ponosi odpowiedzialność za zgodność z prawem oraz prawdziwość materiałów i treści dostarczonych Wykonawcy.
          </ListItem>
        </div>

        {/* §4 Wynagrodzenie */}
        <div className="mb-4">
          <SectionTitle number="§4" title="Wynagrodzenie" />
          
          {/* Contract Value Highlight */}
          <div className="relative mb-3 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-lg blur-sm opacity-40" />
            <div className="relative flex justify-between items-center py-2 px-3 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-lg">
              <span className="text-[9px] text-pink-300 uppercase tracking-wider font-semibold">Wynagrodzenie miesięczne</span>
              <span className="text-base font-bold text-white">{formatAmount(data.contractValue)} zł brutto</span>
            </div>
          </div>
          
          <ListItem number="1.">
            Za świadczenie usług określonych w niniejszej umowie Zleceniodawca zapłaci Wykonawcy wynagrodzenie w wysokości <span className="text-pink-300 font-medium">{formatAmount(data.contractValue)} zł brutto</span> miesięcznie.
          </ListItem>
          <ListItem number="2.">
            Zleceniodawca wpłaca zaliczkę w wysokości 50% miesięcznego wynagrodzenia w terminie 3 dni od otrzymania umowy w formie elektronicznej. Po otrzymaniu zaliczki Wykonawca wystawi rachunek na kwotę wpłaconej zaliczki.
          </ListItem>
          <ListItem number="3.">
            Pozostała część wynagrodzenia (50%) płatna jest w terminie 7 dni od zakończenia obowiązywania umowy, na podstawie rachunku wystawionego przez Wykonawcę na kwotę pozostałą do zapłaty.
          </ListItem>
        </div>
      </ContractPage>

      {/* Page 3 */}
      <ContractPage pageNumber={3}>
        {/* §4 continued */}
        <div className="mb-4">
          <div className="px-2 py-0.5 bg-zinc-800/50 border border-zinc-700/50 rounded inline-block mb-2">
            <span className="text-zinc-500 text-[9px]">§4 Wynagrodzenie (cd.)</span>
          </div>
          <ListItem number="4.">
            W przypadku opóźnienia w płatności Wykonawca ma prawo wstrzymać świadczenie usług do momentu uregulowania zaległości.
          </ListItem>
          <ListItem number="5.">
            Budżet reklamowy na kampanie w systemie Meta Ads Manager finansowany jest w całości przez Zleceniodawcę i nie stanowi części wynagrodzenia Wykonawcy. Wykonawca nie ponosi odpowiedzialności za brak efektów kampanii wynikający z niedostatecznego budżetu reklamowego.
          </ListItem>
        </div>

        {/* §5 Prawa autorskie */}
        <div className="mb-4">
          <SectionTitle number="§5" title="Prawa autorskie" />
          <ListItem number="1.">
            Wszelkie materiały reklamowe przygotowane przez Wykonawcę w ramach niniejszej umowy (grafiki, treści reklamowe, materiały wideo itp.) podlegają ochronie prawnoautorskiej.
          </ListItem>
          <ListItem number="2.">
            Z chwilą uregulowania pełnego wynagrodzenia określonego w § 4, Wykonawca udziela Zleceniodawcy niewyłącznej, bezterminowej licencji na korzystanie z przygotowanych materiałów w celach związanych z działalnością Zleceniodawcy.
          </ListItem>
          <ListItem number="3.">
            Zleceniodawca nie ma prawa do odsprzedaży, sublicencjonowania ani wykorzystywania materiałów do celów niezwiązanych bezpośrednio z jego działalnością bez uprzedniej zgody Wykonawcy.
          </ListItem>
          <ListItem number="4.">
            Wykonawca zachowuje prawo do wykorzystywania przygotowanych materiałów w celach marketingowych i promocyjnych własnej agencji (np. jako element portfolio), o ile nie narusza to tajemnicy przedsiębiorstwa Zleceniodawcy.
          </ListItem>
        </div>

        {/* §6 Określenie terminów */}
        <div className="mb-4">
          <SectionTitle number="§6" title="Określenie terminów" />
          <ListItem number="1.">
            Umowa zostaje zawarta i obowiązuje od dnia dokonania przez Zleceniodawcę wpłaty zaliczki, o której mowa w §4 ust. 2.
          </ListItem>
          <ListItem number="2.">
            Po upływie pierwszego miesiąca umowa może zostać przedłużona wyłącznie za zgodą obu stron, na warunkach ustalonych w odrębnym aneksie lub w formie potwierdzenia mailowego.
          </ListItem>
          <ListItem number="3.">
            W przypadku rażącego naruszenia postanowień umowy przez drugą stronę, rozwiązanie może nastąpić ze skutkiem natychmiastowym.
          </ListItem>
        </div>

        {/* §7 Rozwiązanie umowy */}
        <div className="mb-4">
          <SectionTitle number="§7" title="Rozwiązanie umowy" />
          <ListItem number="1.">
            Umowa może zostać rozwiązana przez każdą ze stron z zachowaniem zasad określonych w § 6.
          </ListItem>
          <ListItem number="2.">Wykonawca ma prawo rozwiązać umowę ze skutkiem natychmiastowym, jeżeli:</ListItem>
          <SubListItem letter="a">Zleceniodawca opóźnia się z płatnością wynagrodzenia o więcej niż 14 dni,</SubListItem>
          <SubListItem letter="b">Zleceniodawca nie przekazuje materiałów lub informacji niezbędnych do prowadzenia kampanii,</SubListItem>
          <SubListItem letter="c">Zleceniodawca narusza obowiązki określone w § 3, uniemożliwiając prawidłowe wykonanie umowy.</SubListItem>
          <ListItem number="3.">
            Zleceniodawca ma prawo rozwiązać umowę ze skutkiem natychmiastowym, jeżeli Wykonawca rażąco narusza obowiązki określone w § 2.
          </ListItem>
        </div>
      </ContractPage>

      {/* Page 4 */}
      <ContractPage pageNumber={4}>
        {/* §7 continued */}
        <div className="mb-4">
          <div className="px-2 py-0.5 bg-zinc-800/50 border border-zinc-700/50 rounded inline-block mb-2">
            <span className="text-zinc-500 text-[9px]">§7 Rozwiązanie umowy (cd.)</span>
          </div>
          <ListItem number="4.">
            Rozwiązanie umowy wymaga formy pisemnej, w tym również w formie elektronicznej (np. poprzez oświadczenie przesłane na adres e-mail wskazany w niniejszej umowie).
          </ListItem>
        </div>

        {/* §8 Postanowienia końcowe */}
        <div className="mb-6">
          <SectionTitle number="§8" title="Postanowienia końcowe" />
          <ListItem number="1.">
            W sprawach nieuregulowanych niniejszą umową zastosowanie mają przepisy Kodeksu cywilnego.
          </ListItem>
          <ListItem number="2.">
            Umowa została sporządzona i przekazana w formie elektronicznej (plik PDF) drogą mailową. Strony zgodnie przyjmują, że taka forma jest wystarczająca do jej ważności i wykonywania, a podpisanie umowy nie jest wymagane, jeżeli Zleceniodawca przystąpi do jej realizacji.
          </ListItem>
        </div>

        {/* Signatures */}
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-16 pt-8">
            <div className="text-center">
              <div className="h-16 border-b-2 border-dashed border-zinc-700 mb-2"></div>
              <p className="text-[10px] text-zinc-500 font-medium">Zleceniodawca</p>
            </div>
            <div className="text-center">
              <div className="h-16 border-b-2 border-dashed border-zinc-700 mb-2"></div>
              <p className="text-[10px] text-zinc-500 font-medium">Agencja marketingowa Aurine</p>
            </div>
          </div>
        </div>
      </ContractPage>
    </div>
  );
};

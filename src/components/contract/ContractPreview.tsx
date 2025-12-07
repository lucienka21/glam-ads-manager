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
  agencyName: string;
  agencyOwnerName: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyAddress: string;
  agencyNip: string;
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
      style={{
        width: '794px',
        height: '1123px',
        backgroundColor: '#0a0a0a',
        color: 'white',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to right, #18181b, #0f0f0f, #000)',
        padding: '20px 24px',
        borderBottom: '1px solid rgba(236, 72, 153, 0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={agencyLogo} 
              alt="Aurine" 
              style={{ width: '48px', height: '48px', objectFit: 'contain' }}
            />
            <div>
              <p style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#71717a', textTransform: 'uppercase' }}>
                {data.agencyName || 'Aurine Agency'}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginTop: '2px' }}>
                Umowa Współpracy
              </p>
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #db2777, #be123c)',
            padding: '10px 20px',
            borderRadius: '16px',
            textAlign: 'right',
          }}>
            <span style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#fce7f3', textTransform: 'uppercase' }}>
              Wynagrodzenie
            </span>
            <p style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginTop: '2px' }}>
              {formatAmount(data.contractValue)} PLN
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: '12px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>
            {data.clientName || "Nazwa Klienta"}
          </h1>
          <p style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
            {data.signCity || "Miejscowość"} • {formatDate(data.signDate)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '16px 24px' }}>
        {/* Parties Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          {/* Wykonawca */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(157, 23, 77, 0.2), rgba(24, 24, 27, 0.5))',
            borderRadius: '16px',
            border: '1px solid rgba(236, 72, 153, 0.15)',
            padding: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ec4899, #be123c)',
                width: '28px',
                height: '28px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Building2 style={{ width: '14px', height: '14px', color: 'white' }} />
              </div>
              <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#f9a8d4', fontWeight: '600', textTransform: 'uppercase' }}>
                Wykonawca
              </span>
            </div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>{data.agencyName || 'Aurine Agency'}</p>
            {data.agencyOwnerName && <p style={{ fontSize: '10px', color: '#a1a1aa', marginTop: '3px' }}>{data.agencyOwnerName}</p>}
            {data.agencyNip && <p style={{ fontSize: '10px', color: '#a1a1aa' }}>NIP: {data.agencyNip}</p>}
            {data.agencyAddress && <p style={{ fontSize: '10px', color: '#a1a1aa' }}>{data.agencyAddress}</p>}
            {data.agencyEmail && <p style={{ fontSize: '10px', color: '#a1a1aa' }}>{data.agencyEmail}</p>}
            {data.agencyPhone && <p style={{ fontSize: '10px', color: '#a1a1aa' }}>Tel: {data.agencyPhone}</p>}
          </div>

          {/* Zleceniodawca */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(24, 24, 27, 0.5))',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            padding: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                width: '28px',
                height: '28px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <User style={{ width: '14px', height: '14px', color: 'white' }} />
              </div>
              <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#93c5fd', fontWeight: '600', textTransform: 'uppercase' }}>
                Zleceniodawca
              </span>
            </div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>{data.clientName || "—"}</p>
            {data.clientOwnerName && <p style={{ fontSize: '10px', color: '#a1a1aa', marginTop: '3px' }}>{data.clientOwnerName}</p>}
            {data.clientNip && <p style={{ fontSize: '10px', color: '#a1a1aa' }}>NIP: {data.clientNip}</p>}
            {data.clientAddress && <p style={{ fontSize: '10px', color: '#a1a1aa' }}>{data.clientAddress}</p>}
            {data.clientEmail && <p style={{ fontSize: '10px', color: '#a1a1aa' }}>{data.clientEmail}</p>}
            {data.clientPhone && <p style={{ fontSize: '10px', color: '#a1a1aa' }}>Tel: {data.clientPhone}</p>}
          </div>
        </div>

        {/* §1 Przedmiot umowy */}
        <div style={{
          background: '#0f0f0f',
          borderRadius: '14px',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          padding: '12px',
          marginBottom: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              background: 'rgba(236, 72, 153, 0.15)',
              border: '1px solid rgba(236, 72, 153, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FileText style={{ width: '11px', height: '11px', color: '#f472b6' }} />
            </div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', color: '#f472b6' }}>§1. Przedmiot umowy</h2>
          </div>
          <p style={{ fontSize: '9px', color: '#d4d4d8', lineHeight: '1.5', marginBottom: '8px' }}>
            Przedmiotem umowy jest świadczenie usług marketingowych online, obejmujących tworzenie i prowadzenie kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych, optymalizację kampanii oraz comiesięczne raportowanie wyników.
          </p>
          {data.services && data.services.length > 0 && (
            <div style={{
              background: 'rgba(24, 24, 27, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              border: '1px solid rgba(63, 63, 70, 0.25)',
            }}>
              <p style={{ fontSize: '8px', color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Usługi objęte umową
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                {data.services.map((service) => (
                  <div key={service.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#f472b6' }}></div>
                    <span style={{ fontSize: '9px', color: '#d4d4d8' }}>{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* §2-3 Obowiązki */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            background: '#0f0f0f',
            borderRadius: '14px',
            border: '1px solid rgba(63, 63, 70, 0.4)',
            padding: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Shield style={{ width: '12px', height: '12px', color: '#34d399' }} />
              <h2 style={{ fontSize: '9px', fontWeight: '700', color: '#34d399' }}>§2. Obowiązki Wykonawcy</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {["Prowadzenie kampanii reklamowych", "Przygotowywanie kreacji reklamowych", "Comiesięczne raportowanie wyników", "Konsultacje marketingowe"].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#34d399', marginTop: '4px', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '8px', color: '#a1a1aa' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: '#0f0f0f',
            borderRadius: '14px',
            border: '1px solid rgba(63, 63, 70, 0.4)',
            padding: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <User style={{ width: '12px', height: '12px', color: '#60a5fa' }} />
              <h2 style={{ fontSize: '9px', fontWeight: '700', color: '#60a5fa' }}>§3. Obowiązki Zleceniodawcy</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {["Dostęp do fanpage i konta reklamowego", "Dostarczenie materiałów (zdjęcia, logo)", "Akceptacja kreacji w 3 dni robocze", "Terminowe regulowanie płatności"].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#60a5fa', marginTop: '4px', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '8px', color: '#a1a1aa' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* §4 Wynagrodzenie */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(157, 23, 77, 0.25), rgba(15, 15, 15, 0.6))',
          borderRadius: '14px',
          border: '1px solid rgba(236, 72, 153, 0.2)',
          padding: '12px',
          marginBottom: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ec4899, #be123c)',
              width: '26px',
              height: '26px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CreditCard style={{ width: '13px', height: '13px', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', color: '#f472b6' }}>§4. Wynagrodzenie i budżet reklamowy</h2>
              <p style={{ fontSize: '8px', color: '#f9a8d4' }}>Warunki finansowe współpracy</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '8px' }}>
            <div style={{ background: 'rgba(24, 24, 27, 0.5)', borderRadius: '10px', padding: '10px', border: '1px solid rgba(63, 63, 70, 0.25)' }}>
              <p style={{ fontSize: '7px', color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>Miesięcznie</p>
              <p style={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{formatAmount(data.contractValue)} PLN</p>
            </div>
            {data.paymentType === "split" ? (
              <>
                <div style={{ background: 'rgba(24, 24, 27, 0.5)', borderRadius: '10px', padding: '10px', border: '1px solid rgba(63, 63, 70, 0.25)' }}>
                  <p style={{ fontSize: '7px', color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>Zaliczka</p>
                  <p style={{ fontSize: '15px', fontWeight: '700', color: '#f472b6' }}>{formatAmount(data.advanceAmount)} PLN</p>
                </div>
                <div style={{ background: 'rgba(24, 24, 27, 0.5)', borderRadius: '10px', padding: '10px', border: '1px solid rgba(63, 63, 70, 0.25)' }}>
                  <p style={{ fontSize: '7px', color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>Pozostała część</p>
                  <p style={{ fontSize: '15px', fontWeight: '700', color: '#d4d4d8' }}>{formatAmount(remainingValue)} PLN</p>
                </div>
              </>
            ) : (
              <div style={{ gridColumn: 'span 2', background: 'rgba(24, 24, 27, 0.5)', borderRadius: '10px', padding: '10px', border: '1px solid rgba(63, 63, 70, 0.25)' }}>
                <p style={{ fontSize: '7px', color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>Płatność</p>
                <p style={{ fontSize: '11px', fontWeight: '600', color: '#d4d4d8' }}>Całość z góry w terminie 3 dni</p>
              </div>
            )}
          </div>
          <p style={{ fontSize: '8px', color: '#71717a', fontStyle: 'italic' }}>
            Budżet reklamowy opłaca Zleceniodawca bezpośrednio do platformy reklamowej (Meta). Nie stanowi wynagrodzenia Wykonawcy.
          </p>
        </div>

        {/* §5-6-7 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
          <div style={{ background: 'rgba(15, 15, 15, 0.6)', borderRadius: '10px', border: '1px solid rgba(63, 63, 70, 0.25)', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <Scale style={{ width: '11px', height: '11px', color: '#a78bfa' }} />
              <h2 style={{ fontSize: '8px', fontWeight: '700', color: '#a78bfa' }}>§5. Prawa autorskie</h2>
            </div>
            <p style={{ fontSize: '7px', color: '#a1a1aa', marginBottom: '2px' }}>• Materiały podlegają ochronie</p>
            <p style={{ fontSize: '7px', color: 'white', fontWeight: '500' }}>• Konto i wyniki → Zleceniodawca</p>
          </div>

          <div style={{ background: 'rgba(15, 15, 15, 0.6)', borderRadius: '10px', border: '1px solid rgba(63, 63, 70, 0.25)', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <Clock style={{ width: '11px', height: '11px', color: '#fbbf24' }} />
              <h2 style={{ fontSize: '8px', fontWeight: '700', color: '#fbbf24' }}>§6. Okres i wypowiedzenie</h2>
            </div>
            <p style={{ fontSize: '7px', color: '#a1a1aa', marginBottom: '2px' }}>• Obowiązuje od wpłaty zaliczki</p>
            <p style={{ fontSize: '7px', color: 'white', fontWeight: '500' }}>• 30-dniowy okres wypowiedzenia</p>
          </div>

          <div style={{ background: 'rgba(15, 15, 15, 0.6)', borderRadius: '10px', border: '1px solid rgba(63, 63, 70, 0.25)', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <AlertTriangle style={{ width: '11px', height: '11px', color: '#f87171' }} />
              <h2 style={{ fontSize: '8px', fontWeight: '700', color: '#f87171' }}>§7. Kary umowne</h2>
            </div>
            <p style={{ fontSize: '7px', color: '#a1a1aa', marginBottom: '2px' }}>• Opóźnienie: 0,5%/dzień</p>
            <p style={{ fontSize: '7px', color: '#a1a1aa' }}>• Rozwiązanie po 14 dni zwłoki</p>
          </div>
        </div>

        {/* §8-9-10 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <div style={{ background: 'rgba(15, 15, 15, 0.6)', borderRadius: '10px', border: '1px solid rgba(63, 63, 70, 0.25)', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <Shield style={{ width: '11px', height: '11px', color: '#fb923c' }} />
              <h2 style={{ fontSize: '8px', fontWeight: '700', color: '#fb923c' }}>§8. Odpowiedzialność</h2>
            </div>
            <p style={{ fontSize: '7px', color: 'white', fontWeight: '500', marginBottom: '2px' }}>• Brak gwarancji wyników</p>
            <p style={{ fontSize: '7px', color: '#a1a1aa' }}>• Zależne od czynników zewn.</p>
          </div>

          <div style={{ background: 'rgba(15, 15, 15, 0.6)', borderRadius: '10px', border: '1px solid rgba(63, 63, 70, 0.25)', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <Lock style={{ width: '11px', height: '11px', color: '#22d3ee' }} />
              <h2 style={{ fontSize: '8px', fontWeight: '700', color: '#22d3ee' }}>§9. RODO</h2>
            </div>
            <p style={{ fontSize: '7px', color: 'white', fontWeight: '500', marginBottom: '2px' }}>• Przetwarzanie zgodne z RODO</p>
            <p style={{ fontSize: '7px', color: '#a1a1aa' }}>• Dane tylko do realizacji umowy</p>
          </div>

          <div style={{ background: 'rgba(15, 15, 15, 0.6)', borderRadius: '10px', border: '1px solid rgba(63, 63, 70, 0.25)', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <Scroll style={{ width: '11px', height: '11px', color: '#a1a1aa' }} />
              <h2 style={{ fontSize: '8px', fontWeight: '700', color: '#a1a1aa' }}>§10. Postanowienia końcowe</h2>
            </div>
            <p style={{ fontSize: '7px', color: '#a1a1aa', marginBottom: '2px' }}>• Stosuje się przepisy KC</p>
            <p style={{ fontSize: '7px', color: '#a1a1aa' }}>• Zmiany wymagają formy pisemnej</p>
          </div>
        </div>

        {/* Signatures */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', paddingTop: '8px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: '36px', borderBottom: '1px solid #3f3f46', marginBottom: '6px' }}></div>
            <p style={{ fontSize: '8px', letterSpacing: '0.15em', color: '#71717a', textTransform: 'uppercase' }}>Zleceniodawca</p>
            <p style={{ fontSize: '10px', color: '#a1a1aa', marginTop: '2px' }}>{data.clientOwnerName || data.clientName || "—"}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: '36px', borderBottom: '1px solid #3f3f46', marginBottom: '6px' }}></div>
            <p style={{ fontSize: '8px', letterSpacing: '0.15em', color: '#71717a', textTransform: 'uppercase' }}>Wykonawca</p>
            <p style={{ fontSize: '10px', color: '#a1a1aa', marginTop: '2px' }}>{data.agencyOwnerName || data.agencyName || 'Aurine Agency'}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 24px',
        borderTop: '1px solid #18181b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#0a0a0a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={agencyLogo} alt="Aurine" style={{ width: '28px', height: '28px', objectFit: 'contain', opacity: 0.6 }} />
          <span style={{ fontSize: '10px', color: '#52525b' }}>aurine.pl</span>
        </div>
        <p style={{ fontSize: '9px', color: '#52525b' }}>
          Profesjonalny marketing dla salonów beauty
        </p>
      </div>
    </div>
  );
};
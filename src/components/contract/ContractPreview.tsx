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
        minHeight: '1123px',
        backgroundColor: '#0a0a0a',
        color: 'white',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        padding: '24px 28px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
        paddingBottom: '14px',
        borderBottom: '2px solid rgba(236, 72, 153, 0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={agencyLogo} 
            alt="Aurine" 
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
          />
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#71717a', textTransform: 'uppercase', marginBottom: '2px' }}>
              {data.agencyName || 'Aurine Agency'}
            </p>
            <p style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>
              Umowa Współpracy
            </p>
            <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
              {data.clientName || "Nazwa Klienta"} • {data.signCity || "Miejscowość"} • {formatDate(data.signDate)}
            </p>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #db2777, #be123c)',
          padding: '10px 20px',
          borderRadius: '12px',
          textAlign: 'right',
        }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.15em', color: '#fce7f3', textTransform: 'uppercase' }}>
            Wynagrodzenie
          </span>
          <p style={{ fontSize: '22px', fontWeight: '800', color: 'white' }}>
            {formatAmount(data.contractValue)} PLN
          </p>
        </div>
      </div>

      {/* Parties */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(157, 23, 77, 0.2), rgba(24, 24, 27, 0.5))',
          borderRadius: '10px',
          border: '1px solid rgba(236, 72, 153, 0.2)',
          padding: '10px 12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Building2 style={{ width: '14px', height: '14px', color: '#f472b6' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#f9a8d4', fontWeight: '600', textTransform: 'uppercase' }}>
              Wykonawca
            </span>
          </div>
          <p style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{data.agencyName || 'Aurine Agency'}</p>
          <p style={{ fontSize: '11px', color: '#d4d4d8' }}>{data.agencyOwnerName}</p>
          <p style={{ fontSize: '10px', color: '#a1a1aa' }}>NIP: {data.agencyNip} • {data.agencyAddress}</p>
          <p style={{ fontSize: '10px', color: '#a1a1aa' }}>{data.agencyEmail} • Tel: {data.agencyPhone}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(24, 24, 27, 0.5))',
          borderRadius: '10px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          padding: '10px 12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <User style={{ width: '14px', height: '14px', color: '#60a5fa' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#93c5fd', fontWeight: '600', textTransform: 'uppercase' }}>
              Zleceniodawca
            </span>
          </div>
          <p style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{data.clientName || "—"}</p>
          <p style={{ fontSize: '11px', color: '#d4d4d8' }}>{data.clientOwnerName}</p>
          <p style={{ fontSize: '10px', color: '#a1a1aa' }}>NIP: {data.clientNip} • {data.clientAddress}</p>
          <p style={{ fontSize: '10px', color: '#a1a1aa' }}>{data.clientEmail} • Tel: {data.clientPhone}</p>
        </div>
      </div>

      {/* §1 Przedmiot umowy */}
      <div style={{
        background: '#0f0f0f',
        borderRadius: '10px',
        border: '1px solid rgba(63, 63, 70, 0.5)',
        padding: '10px 12px',
        marginBottom: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <FileText style={{ width: '12px', height: '12px', color: '#f472b6' }} />
          <h2 style={{ fontSize: '12px', fontWeight: '700', color: '#f472b6' }}>§1. Przedmiot umowy</h2>
        </div>
        <p style={{ fontSize: '10px', color: '#e4e4e7', lineHeight: '1.5', marginBottom: '8px' }}>
          Przedmiotem umowy jest świadczenie usług marketingowych online, obejmujących tworzenie i prowadzenie kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych, optymalizację kampanii oraz comiesięczne raportowanie wyników.
        </p>
        {data.services && data.services.length > 0 && (
          <div style={{ background: 'rgba(24, 24, 27, 0.6)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
            <p style={{ fontSize: '8px', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Usługi objęte umową</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {data.services.map((service) => (
                <div key={service.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#f472b6' }}></div>
                  <span style={{ fontSize: '10px', color: '#e4e4e7' }}>{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* §2-3 Obowiązki */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div style={{ background: '#0f0f0f', borderRadius: '10px', border: '1px solid rgba(63, 63, 70, 0.5)', padding: '10px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Shield style={{ width: '12px', height: '12px', color: '#34d399' }} />
            <h2 style={{ fontSize: '11px', fontWeight: '700', color: '#34d399' }}>§2. Obowiązki Wykonawcy</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {["Prowadzenie kampanii reklamowych", "Przygotowywanie kreacji reklamowych", "Comiesięczne raportowanie wyników", "Konsultacje marketingowe"].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#34d399', marginTop: '5px', flexShrink: 0 }}></div>
                <span style={{ fontSize: '10px', color: '#d4d4d8' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f0f0f', borderRadius: '10px', border: '1px solid rgba(63, 63, 70, 0.5)', padding: '10px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <User style={{ width: '12px', height: '12px', color: '#60a5fa' }} />
            <h2 style={{ fontSize: '11px', fontWeight: '700', color: '#60a5fa' }}>§3. Obowiązki Zleceniodawcy</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {["Dostęp do fanpage i konta reklamowego", "Dostarczenie materiałów (zdjęcia, logo)", "Akceptacja kreacji w 3 dni robocze", "Terminowe regulowanie płatności"].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#60a5fa', marginTop: '5px', flexShrink: 0 }}></div>
                <span style={{ fontSize: '10px', color: '#d4d4d8' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* §4 Wynagrodzenie */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(157, 23, 77, 0.25), rgba(15, 15, 15, 0.6))',
        borderRadius: '10px',
        border: '1px solid rgba(236, 72, 153, 0.2)',
        padding: '10px 12px',
        marginBottom: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <CreditCard style={{ width: '12px', height: '12px', color: '#f472b6' }} />
          <h2 style={{ fontSize: '11px', fontWeight: '700', color: '#f472b6' }}>§4. Wynagrodzenie i budżet reklamowy</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '6px' }}>
          <div style={{ background: 'rgba(24, 24, 27, 0.6)', borderRadius: '8px', padding: '8px', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
            <p style={{ fontSize: '8px', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Miesięcznie</p>
            <p style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>{formatAmount(data.contractValue)} PLN</p>
          </div>
          {data.paymentType === "split" ? (
            <>
              <div style={{ background: 'rgba(24, 24, 27, 0.6)', borderRadius: '8px', padding: '8px', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
                <p style={{ fontSize: '8px', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Zaliczka</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#f472b6' }}>{formatAmount(data.advanceAmount)} PLN</p>
              </div>
              <div style={{ background: 'rgba(24, 24, 27, 0.6)', borderRadius: '8px', padding: '8px', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
                <p style={{ fontSize: '8px', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Pozostała część</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#d4d4d8' }}>{formatAmount(remainingValue)} PLN</p>
              </div>
            </>
          ) : (
            <div style={{ gridColumn: 'span 2', background: 'rgba(24, 24, 27, 0.6)', borderRadius: '8px', padding: '8px', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
              <p style={{ fontSize: '8px', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Płatność</p>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#d4d4d8' }}>Całość z góry w terminie 3 dni roboczych</p>
            </div>
          )}
        </div>
        <p style={{ fontSize: '9px', color: '#a1a1aa', fontStyle: 'italic' }}>
          Budżet reklamowy opłaca Zleceniodawca bezpośrednio do platformy reklamowej (Meta). Nie stanowi wynagrodzenia Wykonawcy.
        </p>
      </div>

      {/* §5-6-7 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
        <div style={{ background: '#0f0f0f', borderRadius: '8px', border: '1px solid rgba(63, 63, 70, 0.4)', padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <Scale style={{ width: '10px', height: '10px', color: '#a78bfa' }} />
            <h2 style={{ fontSize: '10px', fontWeight: '700', color: '#a78bfa' }}>§5. Prawa autorskie</h2>
          </div>
          <p style={{ fontSize: '9px', color: '#a1a1aa', marginBottom: '2px' }}>• Materiały podlegają ochronie prawnej</p>
          <p style={{ fontSize: '9px', color: 'white', fontWeight: '500' }}>• Konto i wyniki należą do Zleceniodawcy</p>
        </div>

        <div style={{ background: '#0f0f0f', borderRadius: '8px', border: '1px solid rgba(63, 63, 70, 0.4)', padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <Clock style={{ width: '10px', height: '10px', color: '#fbbf24' }} />
            <h2 style={{ fontSize: '10px', fontWeight: '700', color: '#fbbf24' }}>§6. Okres i wypowiedzenie</h2>
          </div>
          <p style={{ fontSize: '9px', color: '#a1a1aa', marginBottom: '2px' }}>• Umowa obowiązuje od wpłaty zaliczki</p>
          <p style={{ fontSize: '9px', color: 'white', fontWeight: '500' }}>• 30-dniowy okres wypowiedzenia</p>
        </div>

        <div style={{ background: '#0f0f0f', borderRadius: '8px', border: '1px solid rgba(63, 63, 70, 0.4)', padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <AlertTriangle style={{ width: '10px', height: '10px', color: '#f87171' }} />
            <h2 style={{ fontSize: '10px', fontWeight: '700', color: '#f87171' }}>§7. Kary umowne</h2>
          </div>
          <p style={{ fontSize: '9px', color: '#a1a1aa', marginBottom: '2px' }}>• Opóźnienie płatności: 0,5%/dzień</p>
          <p style={{ fontSize: '9px', color: 'white', fontWeight: '500' }}>• Rozwiązanie po 14 dniach zwłoki</p>
        </div>
      </div>

      {/* §8-9-10 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        <div style={{ background: '#0f0f0f', borderRadius: '8px', border: '1px solid rgba(63, 63, 70, 0.4)', padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <Shield style={{ width: '10px', height: '10px', color: '#fb923c' }} />
            <h2 style={{ fontSize: '10px', fontWeight: '700', color: '#fb923c' }}>§8. Odpowiedzialność</h2>
          </div>
          <p style={{ fontSize: '9px', color: '#a1a1aa', marginBottom: '2px' }}>• Brak gwarancji określonych wyników</p>
          <p style={{ fontSize: '9px', color: 'white', fontWeight: '500' }}>• Odpowiedzialność ograniczona</p>
        </div>

        <div style={{ background: '#0f0f0f', borderRadius: '8px', border: '1px solid rgba(63, 63, 70, 0.4)', padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <Lock style={{ width: '10px', height: '10px', color: '#2dd4bf' }} />
            <h2 style={{ fontSize: '10px', fontWeight: '700', color: '#2dd4bf' }}>§9. RODO</h2>
          </div>
          <p style={{ fontSize: '9px', color: '#a1a1aa', marginBottom: '2px' }}>• Przetwarzanie zgodne z RODO</p>
          <p style={{ fontSize: '9px', color: 'white', fontWeight: '500' }}>• Ochrona danych osobowych</p>
        </div>

        <div style={{ background: '#0f0f0f', borderRadius: '8px', border: '1px solid rgba(63, 63, 70, 0.4)', padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <Scroll style={{ width: '10px', height: '10px', color: '#94a3b8' }} />
            <h2 style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8' }}>§10. Postanowienia końcowe</h2>
          </div>
          <p style={{ fontSize: '9px', color: '#a1a1aa', marginBottom: '2px' }}>• Stosuje się przepisy Kodeksu Cywilnego</p>
          <p style={{ fontSize: '9px', color: 'white', fontWeight: '500' }}>• Umowa w 2 jednobrzmiących egz.</p>
        </div>
      </div>

      {/* Signatures */}
      <div style={{ 
        position: 'absolute',
        bottom: '30px',
        left: '28px',
        right: '28px',
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '60px',
      }}>
        <div>
          <div style={{
            borderTop: '2px solid rgba(236, 72, 153, 0.5)',
            paddingTop: '10px',
          }}>
            <p style={{ fontSize: '10px', color: '#a1a1aa', marginBottom: '2px' }}>Wykonawca</p>
            <p style={{ fontSize: '12px', color: '#f9a8d4', fontWeight: '600' }}>{data.agencyOwnerName || data.agencyName}</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            borderTop: '2px solid rgba(59, 130, 246, 0.5)',
            paddingTop: '10px',
          }}>
            <p style={{ fontSize: '10px', color: '#a1a1aa', marginBottom: '2px' }}>Zleceniodawca</p>
            <p style={{ fontSize: '12px', color: '#93c5fd', fontWeight: '600' }}>{data.clientOwnerName || data.clientName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPreview;

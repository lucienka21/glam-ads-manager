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
        background: '#0a0a0a',
        color: 'white',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        padding: '48px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '2px solid #ec4899'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img 
            src={agencyLogo} 
            alt="Aurine" 
            style={{ width: '56px', height: '56px', borderRadius: '12px' }} 
          />
          <div>
            <div style={{ 
              fontSize: '12px', 
              letterSpacing: '3px', 
              color: '#ec4899', 
              textTransform: 'uppercase',
              fontWeight: '600',
              marginBottom: '6px'
            }}>
              AURINE AGENCY
            </div>
            <div style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              color: 'white',
              lineHeight: '1.1'
            }}>
              Umowa Współpracy
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.6)', 
              marginTop: '6px' 
            }}>
              {data.signCity || "Miejscowość"} • {formatDate(data.signDate)}
            </div>
          </div>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
          borderRadius: '16px',
          padding: '20px 32px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4)'
        }}>
          <div style={{ 
            fontSize: '10px', 
            letterSpacing: '2px', 
            opacity: 0.9, 
            textTransform: 'uppercase',
            marginBottom: '4px'
          }}>
            WYNAGRODZENIE
          </div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: '800' 
          }}>
            {formatAmount(data.contractValue)} PLN
          </div>
        </div>
      </div>

      {/* Parties - Two Columns */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '24px', 
        marginBottom: '28px' 
      }}>
        {/* Wykonawca */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.04) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ 
            fontSize: '11px', 
            letterSpacing: '2px', 
            color: '#f472b6', 
            fontWeight: '700',
            marginBottom: '14px',
            textTransform: 'uppercase'
          }}>
            WYKONAWCA
          </div>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '10px' 
          }}>
            {data.agencyName || 'Aurine Agency'}
          </div>
          <div style={{ 
            fontSize: '15px', 
            color: 'rgba(255,255,255,0.85)', 
            marginBottom: '12px',
            fontWeight: '500'
          }}>
            {data.agencyOwnerName || '—'}
          </div>
          <div style={{ 
            fontSize: '13px', 
            color: 'rgba(255,255,255,0.6)', 
            lineHeight: '1.8' 
          }}>
            {data.agencyNip && <div>NIP: {data.agencyNip}</div>}
            {data.agencyAddress && <div>{data.agencyAddress}</div>}
            <div style={{ color: '#f472b6', marginTop: '8px' }}>
              {data.agencyEmail}{data.agencyPhone && ` • ${data.agencyPhone}`}
            </div>
          </div>
        </div>

        {/* Zleceniodawca */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.04) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ 
            fontSize: '11px', 
            letterSpacing: '2px', 
            color: '#60a5fa', 
            fontWeight: '700',
            marginBottom: '14px',
            textTransform: 'uppercase'
          }}>
            ZLECENIODAWCA
          </div>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: 'white', 
            marginBottom: '10px' 
          }}>
            {data.clientName || '—'}
          </div>
          <div style={{ 
            fontSize: '15px', 
            color: 'rgba(255,255,255,0.85)', 
            marginBottom: '12px',
            fontWeight: '500'
          }}>
            {data.clientOwnerName || '—'}
          </div>
          <div style={{ 
            fontSize: '13px', 
            color: 'rgba(255,255,255,0.6)', 
            lineHeight: '1.8' 
          }}>
            {data.clientNip && <div>NIP: {data.clientNip}</div>}
            {data.clientAddress && <div>{data.clientAddress}</div>}
            <div style={{ marginTop: '8px' }}>
              {data.clientEmail || '—'}{data.clientPhone && ` • ${data.clientPhone}`}
            </div>
          </div>
        </div>
      </div>

      {/* §1 Przedmiot umowy */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '700', 
          color: '#f472b6', 
          marginBottom: '10px' 
        }}>
          §1. Przedmiot umowy
        </div>
        <div style={{ 
          fontSize: '13px', 
          color: 'rgba(255,255,255,0.75)', 
          lineHeight: '1.7',
          marginBottom: '14px'
        }}>
          Przedmiotem umowy jest świadczenie usług marketingowych online, obejmujących tworzenie i prowadzenie 
          kampanii reklamowych Facebook/Instagram Ads, przygotowanie materiałów reklamowych, optymalizację 
          kampanii oraz comiesięczne raportowanie wyników.
        </div>
        {data.services && data.services.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {data.services.map((service) => (
              <span 
                key={service.id} 
                style={{ 
                  fontSize: '12px', 
                  background: 'rgba(236, 72, 153, 0.2)', 
                  color: '#f9a8d4', 
                  padding: '6px 14px', 
                  borderRadius: '20px',
                  border: '1px solid rgba(236, 72, 153, 0.3)'
                }}
              >
                {service.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* §2 & §3 - Obowiązki */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px', 
        marginBottom: '20px' 
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <div style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            color: '#34d399', 
            marginBottom: '10px' 
          }}>
            §2. Obowiązki Wykonawcy
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: 'rgba(255,255,255,0.7)', 
            lineHeight: '2' 
          }}>
            • Prowadzenie kampanii reklamowych<br/>
            • Przygotowywanie kreacji reklamowych<br/>
            • Comiesięczne raportowanie wyników<br/>
            • Konsultacje marketingowe
          </div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <div style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            color: '#60a5fa', 
            marginBottom: '10px' 
          }}>
            §3. Obowiązki Zleceniodawcy
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: 'rgba(255,255,255,0.7)', 
            lineHeight: '2' 
          }}>
            • Dostęp do fanpage i konta reklamowego<br/>
            • Dostarczenie materiałów (zdjęcia, logo)<br/>
            • Akceptacja kreacji w 3 dni robocze<br/>
            • Terminowe regulowanie płatności
          </div>
        </div>
      </div>

      {/* §4 Wynagrodzenie */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(0,0,0,0.3) 100%)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '700', 
          color: '#f472b6', 
          marginBottom: '16px' 
        }}>
          §4. Wynagrodzenie i budżet reklamowy
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: data.paymentType === "split" ? 'repeat(3, 1fr)' : '1fr 2fr',
          gap: '14px',
          marginBottom: '14px'
        }}>
          <div style={{ 
            background: 'rgba(0,0,0,0.4)', 
            borderRadius: '10px', 
            padding: '16px', 
            textAlign: 'center' 
          }}>
            <div style={{ 
              fontSize: '10px', 
              color: 'rgba(255,255,255,0.5)', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              marginBottom: '6px'
            }}>
              MIESIĘCZNIE
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>
              {formatAmount(data.contractValue)} PLN
            </div>
          </div>
          
          {data.paymentType === "split" ? (
            <>
              <div style={{ 
                background: 'rgba(0,0,0,0.4)', 
                borderRadius: '10px', 
                padding: '16px', 
                textAlign: 'center' 
              }}>
                <div style={{ 
                  fontSize: '10px', 
                  color: 'rgba(255,255,255,0.5)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  marginBottom: '6px'
                }}>
                  ZALICZKA
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#f472b6' }}>
                  {formatAmount(advanceValue)} PLN
                </div>
              </div>
              <div style={{ 
                background: 'rgba(0,0,0,0.4)', 
                borderRadius: '10px', 
                padding: '16px', 
                textAlign: 'center' 
              }}>
                <div style={{ 
                  fontSize: '10px', 
                  color: 'rgba(255,255,255,0.5)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  marginBottom: '6px'
                }}>
                  POZOSTAŁA CZĘŚĆ
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'rgba(255,255,255,0.7)' }}>
                  {formatAmount(remainingValue)} PLN
                </div>
              </div>
            </>
          ) : (
            <div style={{ 
              background: 'rgba(0,0,0,0.4)', 
              borderRadius: '10px', 
              padding: '16px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>
                Płatność z góry w terminie 3 dni roboczych
              </div>
            </div>
          )}
        </div>
        
        <div style={{ 
          fontSize: '12px', 
          color: 'rgba(255,255,255,0.5)', 
          fontStyle: 'italic' 
        }}>
          Budżet reklamowy opłaca Zleceniodawca bezpośrednio do platformy reklamowej (Meta). 
          Nie stanowi wynagrodzenia Wykonawcy.
        </div>
      </div>

      {/* §5-10 Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '12px',
        marginBottom: '40px'
      }}>
        {[
          { num: '§5', title: 'Prawa autorskie', text: 'Materiały podlegają ochronie. Konto i wyniki należą do Zleceniodawcy.', color: '#a78bfa' },
          { num: '§6', title: 'Wypowiedzenie', text: 'Umowa od wpłaty zaliczki. 30-dniowy okres wypowiedzenia.', color: '#fbbf24' },
          { num: '§7', title: 'Kary umowne', text: 'Opóźnienie: 0,5%/dzień. Rozwiązanie po 14 dniach zwłoki.', color: '#f87171' },
          { num: '§8', title: 'Odpowiedzialność', text: 'Brak gwarancji wyników. Odpowiedzialność ograniczona.', color: '#fb923c' },
          { num: '§9', title: 'RODO', text: 'Przetwarzanie danych zgodne z RODO.', color: '#2dd4bf' },
          { num: '§10', title: 'Postanowienia', text: 'Stosuje się KC. Umowa w 2 jednobrzmiących egz.', color: '#94a3b8' }
        ].map((item) => (
          <div 
            key={item.num}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              padding: '14px'
            }}
          >
            <div style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              color: item.color, 
              marginBottom: '6px' 
            }}>
              {item.num}. {item.title}
            </div>
            <div style={{ 
              fontSize: '10px', 
              color: 'rgba(255,255,255,0.55)', 
              lineHeight: '1.5' 
            }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Signatures */}
      <div style={{ 
        position: 'absolute',
        bottom: '48px',
        left: '48px',
        right: '48px',
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '80px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            borderTop: '2px solid #ec4899', 
            paddingTop: '14px' 
          }}>
            <div style={{ 
              fontSize: '11px', 
              color: 'rgba(255,255,255,0.5)', 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              WYKONAWCA
            </div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#f9a8d4' 
            }}>
              {data.agencyOwnerName || data.agencyName || 'Aurine Agency'}
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            borderTop: '2px solid #3b82f6', 
            paddingTop: '14px' 
          }}>
            <div style={{ 
              fontSize: '11px', 
              color: 'rgba(255,255,255,0.5)', 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              ZLECENIODAWCA
            </div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#93c5fd' 
            }}>
              {data.clientOwnerName || data.clientName || '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPreview;
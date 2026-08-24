import React from 'react';
import { X, Wrench, Radio, Flame, Sun, Sparkles, FileText, Compass } from 'lucide-react';

export default function InspectModal({ activeItem, onClose }) {
  if (!activeItem) return null;

  const getContent = () => {
    switch (activeItem) {
      case 'motorcycle':
        return {
          title: '1968 Bullet 350 Single-Cylinder',
          subtitle: 'The Crown Jewel of Retro Indian Roads',
          icon: <Flame size={28} style={{ color: '#f59e0b' }} />,
          badge: 'Visual Focal Point',
          description:
            'A legendary 350cc single-cylinder heavy-iron motorcycle featuring a handcrafted teardrop fuel tank with brass pinstriping, twin spoked wire wheels, and a signature thumper exhaust cadence.',
          specs: [
            { label: 'Engine', value: '346cc 4-Stroke Air-Cooled' },
            { label: 'Power', value: '18 BHP @ 5600 RPM' },
            { label: 'Transmission', value: '4-Speed Foot Shift' },
            { label: 'Frame', value: 'Single Downtube Tubular Steel' },
            { label: 'Dry Weight', value: '175 kg' },
            { label: 'Status', value: 'Maintained & Workshop Tuned' }
          ]
        };

      case 'radio':
        return {
          title: 'Retro Valve Radio Receiver',
          subtitle: 'Vintage Airwaves & Radio Tunes',
          icon: <Radio size={28} style={{ color: '#d97706' }} />,
          badge: 'Tuned: 104.2 FM',
          description:
            'A polished mahogany-cabinet valve radio equipped with a glowing frequency dial glass, woven brass speaker mesh, and warm analog vacuum tube amplification.',
          specs: [
            { label: 'Cabinet', value: 'Solid Teak & Brass Trim' },
            { label: 'Tuning Range', value: '88 MHz – 108 MHz FM / AM' },
            { label: 'Speaker', value: '6-inch Heavy Magnet Cone' },
            { label: 'Audio Engine', value: 'YouTube IFrame Player Integration Ready' }
          ]
        };

      case 'lamp':
        return {
          title: 'Tungsten Pendant Garage Lamp',
          subtitle: 'Atmospheric Overhead Illumination',
          icon: <Sparkles size={28} style={{ color: '#fbbf24' }} />,
          badge: 'Lighting Toggle',
          description:
            'An industrial green enamel shade housing a warm 100W filament tungsten bulb with a manual brass pull-chain switch.',
          specs: [
            { label: 'Shade', value: 'Heavy Duty Enamel Steel' },
            { label: 'Switch', value: 'Beaded Brass Pull Chain' },
            { label: 'Color Temp', value: '2700K Soft Amber Warmth' }
          ]
        };

      case 'window':
        return {
          title: 'Slatted Workshop Window',
          subtitle: 'Daylight & Dusk Atmospheric Rays',
          icon: <Sun size={28} style={{ color: '#38bdf8' }} />,
          badge: 'Environment Toggle',
          description:
            'A classic slatted glass window framing the outdoor sky, casting natural angled light beams across the floating dust particles inside the garage.',
          specs: [
            { label: 'Glass', value: 'Reinforced Wire Slats' },
            { label: 'Lighting Shift', value: 'Interactive Day / Night Mode' }
          ]
        };

      case 'posters':
        return {
          title: 'Vintage Motorcycle Rally Posters',
          subtitle: 'Historic Memorabilia & Blueprints',
          icon: <FileText size={28} style={{ color: '#b45309' }} />,
          badge: 'Garage Art',
          description:
            'Framed retro race posters and technical blueprint sheets commemorating iconic Indian motorcycle rallies and mechanical schematics.',
          specs: [
            { label: 'Collection', value: '1968 Bombay Grand Prix' },
            { label: 'Blueprint', value: '350cc Single Engine Breakdown' }
          ]
        };

      case 'tools':
        return {
          title: 'Mechanic Pegboard Toolset',
          subtitle: 'Precision Hand Tools & Hardware',
          icon: <Wrench size={28} style={{ color: '#d1d5db' }} />,
          badge: 'Workshop Gear',
          description:
            'A curated wall-mounted pegboard holding chrome-vanadium spanners, heavy hammers, torque wrenches, spark plug pullers, and grease guns.',
          specs: [
            { label: 'Hardware', value: 'Metric & Whitworth Wrenches' },
            { label: 'Condition', value: 'Oil-Coated & Hand-Tuned' }
          ]
        };

      case 'workbench':
      default:
        return {
          title: 'Heavy Teak Wood Workbench',
          subtitle: 'Engine Restoration Bench',
          icon: <Compass size={28} style={{ color: '#b88339' }} />,
          badge: 'Craftstation',
          description:
            'A sturdy oil-stained solid teak workbench fitted with a cast-iron vice clamp, copper tray, and mechanical assembly tools.',
          specs: [
            { label: 'Material', value: 'Solid Hardwood & Steel Bracing' },
            { label: 'Equipment', value: '4-inch Bench Vice Clamp' }
          ]
        };
    }
  };

  const itemData = getContent();

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 4, 3, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: '#1b1611',
          border: '1px solid #d97706',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(217, 119, 6, 0.25)',
          position: 'relative',
          color: '#f5eedc',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        className="modal-scroll"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="interactive-hover"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#2a2018',
            border: '1px solid #4a3c2c',
            color: '#a39580',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#271e16',
              border: '1px solid #4a3826',
              borderRadius: '12px'
            }}
          >
            {itemData.icon}
          </div>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                backgroundColor: 'rgba(217, 119, 6, 0.15)',
                border: '1px solid rgba(217, 119, 6, 0.4)',
                borderRadius: '10px',
                color: '#fbbf24',
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: '4px'
              }}
            >
              {itemData.badge}
            </span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#f5eedc', lineHeight: 1.2 }}>
              {itemData.title}
            </h2>
            <p style={{ color: '#a39580', fontSize: '0.85rem' }}>{itemData.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p style={{ color: '#d1c7b7', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          {itemData.description}
        </p>

        {/* Technical Specs List */}
        <div
          style={{
            backgroundColor: '#120e0a',
            border: '1px solid #33281c',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}
        >
          <h4
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              color: '#d97706',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '0.75rem'
            }}
          >
            Specifications & Details
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 1rem' }}>
            {itemData.specs.map((spec, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#8c7d6b', fontSize: '0.75rem' }}>{spec.label}</span>
                <span style={{ color: '#f5eedc', fontSize: '0.85rem', fontWeight: 600 }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            className="interactive-hover"
            style={{
              backgroundColor: '#d97706',
              color: '#0f0d0b',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)'
            }}
          >
            Return to Garage
          </button>
        </div>
      </div>
    </div>
  );
}

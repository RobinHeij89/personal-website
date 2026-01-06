# Three.js Debug Tools

Deze website heeft nu **lil-gui** debug panels geïnstalleerd waarmee je real-time Three.js elementen kunt debuggen en aanpassen.

## 🎮 Hoe te gebruiken

De debug panels worden **alleen in development mode** getoond en zijn automatisch geïntegreerd in de Three.js scenes.

### Start de development server:
```bash
pnpm dev
```

De debug panels verschijnen automatisch rechtsboven in de browser.

## 🛠️ Beschikbare Debug Panels

### 1. **ThreeDebug** - Algemene Scene Controls
Geïntegreerd in: `src/features/hero/components/hero-scene.tsx`

**Features:**
- **Camera controls**: Positie (X, Y, Z) en Field of View (FOV)
- **Renderer settings**: Pixel ratio en tone mapping exposure
- **Lights**: Intensiteit, kleur en positie van alle lichten in de scene
- **Objects**: Positie, rotatie, schaal en zichtbaarheid van meshes
- **Scene Stats**: Aantal objecten, triangles en vertices

### 2. **ShaderDebug** - Shader Material Controls
Geïntegreerd in: `src/features/hero/components/animated-plane.tsx`

**Features:**
- **Material properties**: Wireframe, transparantie, opacity
- **Shader uniforms**: Real-time aanpassing van alle shader parameters
  - `time`: Shader animatie tijd (0-100)
  - `progress`: Shader progress value (0-1)
  - `uColor`: Array van kleuren voor de shader
  - `resolution` & `pixels`: Resolutie waarden
- **Performance stats**: FPS en frame time monitoring

### 3. **ParticlesDebug** - Particle System Controls
Geïntegreerd in: `src/components/three/particles/particles.tsx`

**Features:**
- **Particle count**: Aantal particles (read-only)
- **Size**: Grootte van de particles (0.001 - 0.1)
- **Opacity**: Transparantie (0 - 1)
- **Blending modes**: NoBlending, Normal, Additive, Subtractive, Multiply
- **Size attenuation**: Of particles kleiner worden met afstand

## 🎨 Voorbeelden

### Camera aanpassen
1. Open het **Camera** folder in het debug panel
2. Pas de Position X, Y, Z sliders aan om de camera te verplaatsen
3. Wijzig de FOV slider om in/uit te zoomen

### Shader kleuren aanpassen
1. Open het **Animated Plane Shader** folder
2. Navigeer naar **Uniforms** > **uColor**
3. Klik op de kleurvakjes om de shader kleuren aan te passen
4. Zie de wijzigingen direct in de browser

### Particles tweaken
1. Open het **Particles** folder
2. Pas de **Size** slider aan voor grotere/kleinere particles
3. Wijzig **Opacity** voor transparantie
4. Experimenteer met **Blending Mode** voor verschillende effecten

### Lichten aanpassen
1. Open het **Lights** folder
2. Selecteer een light (DirectionalLight, PointLight, etc.)
3. Pas **Intensity** aan voor helderheid
4. Klik op **Color** om de lichtkleur te wijzigen
5. Versleep **Position** sliders om het licht te verplaatsen

## 📁 Structuur

```
src/components/three/debug/
├── ThreeDebug.tsx       # Algemene scene debugging
├── ShaderDebug.tsx      # Shader material debugging
├── ParticlesDebug.tsx   # Particle system debugging
└── index.ts             # Exports
```

## 🔧 Custom Debug Panel Toevoegen

Wil je een debug panel toevoegen aan een eigen Three.js component?

```tsx
import { ShaderDebug } from '@/components/three/debug';

// In je component:
<ShaderDebug 
  material={yourShaderMaterial} 
  name="Your Shader Name" 
  enabled={true} // Optioneel, default is development mode
/>
```

Voor particles:
```tsx
import { ParticlesDebug } from '@/components/three/debug';

<ParticlesDebug 
  material={yourParticleMaterial} 
  count={particleCount}
/>
```

## 🎯 Tips

- **Cmd/Ctrl + Click** op een folder titel om alle child folders te openen/sluiten
- De panels zijn **draggable** - sleep ze naar een handige positie
- Waarden worden real-time bijgewerkt zonder page refresh
- Debug panels zijn **automatisch uitgeschakeld** in production builds
- Je kunt meerdere panels tegelijk open hebben

## 🚀 Performance

De debug tools hebben minimale impact op performance omdat ze:
- Alleen in development mode actief zijn
- Gebruik maken van efficiënte GUI updates
- Geen render cycles triggeren tenzij je actief waarden aanpast

## 📚 Meer informatie

- [lil-gui documentatie](https://lil-gui.georgealways.com/)
- [Three.js documentatie](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

Veel plezier met debuggen! 🎉

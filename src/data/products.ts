import { Product, SportCategory } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_sports_gear_1791180738337.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-basketball-pro',
    name: 'AeroGrip Tournament Composite Basketball',
    brand: 'Vertex Court',
    category: 'basketball',
    price: 89.00,
    originalPrice: 110.00,
    rating: 4.9,
    reviewCount: 148,
    image: '/src/assets/images/product_pro_basketball_1791180751462.jpg',
    tagline: 'Championship moisture-wicking composite with recessed micro-grooves',
    description: 'Engineered for competitive indoor and hardwood tournament play. The AeroGrip surface features micro-channeled composite leather that dissipates palm perspiration instantly, delivering maximum tactile control during high-velocity crossover moves and jump shooting.',
    specs: [
      { label: 'Surface', value: 'High-density micro-grooved composite leather' },
      { label: 'Carcass', value: '100% wound nylon core with butyl bladder' },
      { label: 'Air Retention', value: 'Tested for 90-day pressure lock' },
      { label: 'Certification', value: 'Official FIBA & NFHS regulation specs' },
      { label: 'Standard Weight', value: '624g (Size 7 standard)' }
    ],
    features: [
      'Cushioned sponge core for soft touch off the glass and rim',
      'Pebbled precision channels for effortless spin generation',
      'Advanced moisture-management cover for sweaty overtime sessions',
      'Deep channel contouring for natural hand alignment on release'
    ],
    stock: 28,
    optionsName: 'Ball Size',
    options: ['Size 7 (Official Mens 29.5")', 'Size 6 (Official Womens 28.5")', 'Size 5 (Youth 27.5")'],
    skillLevel: 'Elite / Pro',
    badge: 'Championship Spec',
    isFeatured: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        rating: 5,
        date: '3 days ago',
        verified: true,
        title: 'Insane grip off sweaty palms',
        comment: 'We run full court competitive runs 4 nights a week. This ball has far better tack and grip than typical generic game balls. Incredible balance in the air.'
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        rating: 5,
        date: '1 week ago',
        verified: true,
        title: 'True bounce off the rim',
        comment: 'Weight distribution is dead centered. No weird dead bounces on bank shots. Feels premium right out of the box without needing weeks of break-in.'
      }
    ]
  },
  {
    id: 'prod-running-carbon',
    name: 'Kinetic Strata Carbon Marathon Racer',
    brand: 'Vertex Track',
    category: 'running',
    price: 245.00,
    originalPrice: 280.00,
    rating: 4.95,
    reviewCount: 312,
    image: '/src/assets/images/product_running_shoes_1791180762838.jpg',
    tagline: 'Dual-density supercritical foam with full-length articulated carbon plate',
    description: 'Engineered for sub-3-hour marathoners and tempo day warriors. The Kinetic Strata pairs our responsive nitrogen-infused foam midsole with a curved carbon-composite propulsion blade for maximum energy return and aggressive forward roll on asphalt and track.',
    specs: [
      { label: 'Weight', value: '188g (Men’s US 9.5)' },
      { label: 'Stack Height', value: '39.5mm heel / 31.5mm forefoot (8mm drop)' },
      { label: 'Plate', value: 'Spoon-shaped 3K carbon composite' },
      { label: 'Midsole', value: 'Supercritical PEBA foam (88% rebound)' },
      { label: 'Outsole', value: 'Micro-lugged liquid rubber compound' }
    ],
    features: [
      'Propulsive toe-off rocker saves calf glycogen over 26.2 miles',
      'Ultra-breathable single-layer engineered monomesh upper',
      'Anatomical heel cup prevents heel slippage during aggressive paces',
      'Reinforced high-wear zones for 450+ race miles longevity'
    ],
    stock: 14,
    optionsName: 'Shoe Size (US)',
    options: ['US 8.0', 'US 8.5', 'US 9.0', 'US 9.5', 'US 10.0', 'US 10.5', 'US 11.0', 'US 12.0'],
    skillLevel: 'Elite / Pro',
    badge: 'Carbon Propulsion',
    isFeatured: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Devon K., Sub-2:45 Marathoner',
        rating: 5,
        date: '2 weeks ago',
        verified: true,
        title: 'PR dropped by 4 minutes on first half-marathon outing',
        comment: 'The snap off the forefoot is remarkable. Cushioned enough to save your quads, but stiff enough that you never sink into the foam. Worth every cent.'
      },
      {
        id: 'rev-4',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '3 weeks ago',
        verified: true,
        title: 'Lightest shoe in my rotation',
        comment: 'Lacing lockdown is completely secure. Ran a wet 15-miler with zero hot spots or blisters. Breathability is exceptional.'
      }
    ]
  },
  {
    id: 'prod-tennis-racket-graphite',
    name: 'Vortex Precision Tour 98 Graphite Racket',
    brand: 'Vertex Court',
    category: 'tennis',
    price: 219.00,
    originalPrice: 249.00,
    rating: 4.88,
    reviewCount: 94,
    image: '/src/assets/images/product_tennis_racket_1791180773717.jpg',
    tagline: 'Toray High-Modulus Carbon weave with vibration damping foam handle',
    description: 'Developed for aggressive baseliners and modern all-court competitors seeking surgical ball placement and spin potential. The 98-square-inch head delivers laser-guided accuracy, while the thin 21mm box beam provides unmatched ball feedback on contact.',
    specs: [
      { label: 'Head Size', value: '98 sq. in. / 632 sq. cm' },
      { label: 'Unstrung Weight', value: '305g / 10.8 oz' },
      { label: 'String Pattern', value: '16x19 Spin-Oriented Matrix' },
      { label: 'Beam Width', value: '21.5mm Constant Flat Box Beam' },
      { label: 'Balance', value: '315mm (7 pts Head Light)' },
      { label: 'Stiffness (RA)', value: '64 (Arm-Friendly Flex)' }
    ],
    features: [
      'High-purity carbon braid minimizes torsional twisting on off-center hits',
      'Integrated silicone-dampening core protects tennis elbow and wrist tendons',
      'Aerodynamic beam profile cuts through air for rapid swing speed',
      'Pre-strung with Vertex Tour Poly 17G at 52 lbs'
    ],
    stock: 19,
    optionsName: 'Grip Size',
    options: ['Grip 1 (4 1/8")', 'Grip 2 (4 1/4")', 'Grip 3 (4 3/8")', 'Grip 4 (4 1/2")'],
    skillLevel: 'Performance',
    badge: 'Tour Preferred',
    isFeatured: true,
    reviews: [
      {
        id: 'rev-5',
        author: 'Coach Andrea Bianchi',
        rating: 5,
        date: '5 days ago',
        verified: true,
        title: 'Pinpoint targeting on flat serves and topspin corners',
        comment: 'Great flex feel. You can feel the ball dwell on the stringbed for split milliseconds longer than stiff power frames, giving tremendous directional control.'
      }
    ]
  },
  {
    id: 'prod-gym-kettlebell-iron',
    name: 'Apex Competition Cast-Iron Kettlebell',
    brand: 'Vertex Iron',
    category: 'training',
    price: 95.00,
    originalPrice: 115.00,
    rating: 4.92,
    reviewCount: 167,
    image: '/src/assets/images/product_training_kettlebell_1791180783957.jpg',
    tagline: 'Single-pour gravity cast bell with precision balanced window and powder finish',
    description: 'Forged from virgin gray cast iron without seams, weld points, or fillers. Engineered to international competition dimensions with a consistent 35mm diameter smooth handle that holds chalk efficiently and reduces hand blistering during high-volume snatch and clean-and-jerk workouts.',
    specs: [
      { label: 'Material', value: 'Virgin Gray Cast Iron (Single Gravity Pour)' },
      { label: 'Handle Diameter', value: '35mm Competition Spec' },
      { label: 'Base', value: 'Precision CNC Machined Flat Base (Zero Wobble)' },
      { label: 'Finish', value: 'Electrostatic Matte Powder Coat' },
      { label: 'Weight Tolerance', value: '+/- 1% Precision Calibrated' }
    ],
    features: [
      'Zero filler plugs or plastic bottoms — solid metal construction',
      'Color-coded handle bands for instant weight recognition on the rack',
      'Chalk-retentive textured finish prevents slippage during sweaty sets',
      'Wide window geometry accommodates two-handed swings comfortably'
    ],
    stock: 42,
    optionsName: 'Weight Caliber',
    options: ['16 kg (35 lbs) - Yellow', '20 kg (44 lbs) - Purple', '24 kg (53 lbs) - Green', '32 kg (70 lbs) - Red'],
    skillLevel: 'All-Rounder',
    badge: 'Cast Virgin Iron',
    isFeatured: true,
    reviews: [
      {
        id: 'rev-6',
        author: 'Tyler Brooks, Strength Coach',
        rating: 5,
        date: '4 days ago',
        verified: true,
        title: 'Indestructible feel and flat stable base',
        comment: 'We use these daily in our functional fitness box. The flat machined base means you can do kettlebell pushups and renegade rows with zero wobble. Top-grade casting.'
      }
    ]
  },
  {
    id: 'prod-soccer-matchball',
    name: 'HyperFlight Pro Thermal Match Soccer Ball',
    brand: 'Vertex Pitch',
    category: 'soccer',
    price: 135.00,
    originalPrice: 160.00,
    rating: 4.87,
    reviewCount: 88,
    image: '/src/assets/images/hero_sports_gear_1791180738337.jpg',
    tagline: 'Thermally bonded 12-panel aerodynamic match ball with zero stitch water uptake',
    description: 'Official match ball engineered with high-frequency thermal bonding technology that eliminates needle stitching. The textured 3D micro-dimpled surface produces predictable aerodynamic trajectory in wind and torrential rain with zero water absorption.',
    specs: [
      { label: 'Construction', value: '12-Panel Thermally Bonded Seamless Casing' },
      { label: 'Cover', value: 'High-Resilience Polyurethane with 3D Dimples' },
      { label: 'Bladder', value: 'Carbon-Latex Bladder with Enclosed Valve' },
      { label: 'Water Uptake', value: '<0.2% in submersion testing' },
      { label: 'Certification', value: 'FIFA Quality Pro Standard' }
    ],
    features: [
      'Thermal fusion ensures absolute sphericity and uniform bounce',
      'Laser-etched micro-dimples create stabilizing boundary air flow',
      'High-rebound polyolefin foam backing for responsive contact feel',
      'Tested to withstand over 2,500 50km/h steel plate strikes'
    ],
    stock: 22,
    optionsName: 'Ball Size',
    options: ['Size 5 (Standard Match 12+ yrs)', 'Size 4 (Youth Academy 8-12 yrs)'],
    skillLevel: 'Elite / Pro',
    badge: 'FIFA Quality Pro',
    isFeatured: false,
    reviews: [
      {
        id: 'rev-7',
        author: 'Diego Santos',
        rating: 5,
        date: '1 week ago',
        verified: true,
        title: 'Flies true like an arrow',
        comment: 'Knuckleballs and curlers fly exactly as intended without erratic swerves. Perfect weight and soft responsive touch.'
      }
    ]
  },
  {
    id: 'prod-training-speed-rope',
    name: 'Velocity Surge Aluminum Bearing Speed Rope',
    brand: 'Vertex Iron',
    category: 'training',
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.8,
    reviewCount: 205,
    image: '/src/assets/images/product_training_kettlebell_1791180783957.jpg',
    tagline: 'Dual ball-bearing aircraft aluminum jump rope with coated steel speed cable',
    description: 'Built for high-cadence double-unders, boxers, and metabolic conditioning. CNC machined knurled aircraft aluminum handles feature dual 360-degree high-speed bearings that rotate with zero drag or rope tangle.',
    specs: [
      { label: 'Handle Material', value: '6061 Aircraft Aluminum with Diamond Knurl' },
      { label: 'Cable', value: '3.0m Nylon-Coated Stainless Steel (Cut-to-Fit)' },
      { label: 'Bearings', value: 'Dual High-Precision ABEC-9 Stainless Bearings' },
      { label: 'Adjustment', value: 'Thumb-screw quick clamping system' },
      { label: 'Weight', value: '165g total system' }
    ],
    features: [
      'Zero-tangling 360-degree orbital rotation mechanism',
      'Sweat-resistant textured knurled handle grip',
      'Comes with spare 2.5mm indoor cable and travel storage pouch',
      'Effortless 300+ rpm double-under speed'
    ],
    stock: 55,
    optionsName: 'Handle Finish',
    options: ['Gunmetal Slate', 'Matte Obsidian', 'Hyper Volt Green'],
    skillLevel: 'All-Rounder',
    badge: 'Speed Bearings',
    isFeatured: false,
    reviews: [
      {
        id: 'rev-8',
        author: 'Coach Rachel L.',
        rating: 5,
        date: '3 weeks ago',
        verified: true,
        title: 'Mastered double unders in 3 sessions',
        comment: 'The bearing speed is silky smooth. The cable cut-to-fit adjustment takes 60 seconds with simple wire cutters.'
      }
    ]
  },
  {
    id: 'prod-accessories-recovery-roller',
    name: 'VibeMatrix Deep Tissue Recovery Roller',
    brand: 'Vertex Recovery',
    category: 'accessories',
    price: 54.00,
    originalPrice: 65.00,
    rating: 4.75,
    reviewCount: 119,
    image: '/src/assets/images/product_running_shoes_1791180762838.jpg',
    tagline: 'High-density contoured EPP foam roller with hollow reinforced core',
    description: 'Engineered for post-workout myofascial release, tight IT bands, hamstrings, and thoracic spine mobility. The multi-density grid pattern mimics the thumb and finger pads of a sports massage therapist.',
    specs: [
      { label: 'Core', value: 'Reinforced ABS rigid structural cylinder' },
      { label: 'Exterior', value: 'High-Density Non-Toxic EPP Eco-Foam' },
      { label: 'Length', value: '38cm / 15 inches' },
      { label: 'Diameter', value: '14cm / 5.5 inches' },
      { label: 'Max Load', value: '250 kg / 550 lbs' }
    ],
    features: [
      'Rigid hollow core does not crush or deform over heavy athletic use',
      'Alternating ridge and flat zones for targeted trigger point therapy',
      'Waterproof, sweat-resistant, and easily sanitizable',
      'Compact size fits easily into standard gym gym bags'
    ],
    stock: 35,
    optionsName: 'Density Level',
    options: ['Firm Standard', 'Ultra-Dense High Rigidity'],
    skillLevel: 'All-Rounder',
    badge: 'Myofascial Care',
    isFeatured: false,
    reviews: [
      {
        id: 'rev-9',
        author: 'Jordan Miles',
        rating: 5,
        date: '2 weeks ago',
        verified: true,
        title: 'Saved my tight hip flexors',
        comment: 'Much better than the soft cheap foam rollers at commercial gyms that flatten out within months. Sturdy as rock.'
      }
    ]
  },
  {
    id: 'prod-accessories-gear-bag',
    name: 'Endurance Pro Weatherproof 45L Duffel',
    brand: 'Vertex Gear',
    category: 'accessories',
    price: 119.00,
    originalPrice: 145.00,
    rating: 4.9,
    reviewCount: 76,
    image: '/src/assets/images/hero_sports_gear_1791180738337.jpg',
    tagline: 'TPU laminated ballistic nylon with ventilated wet/dry shoe tunnel',
    description: 'Designed for multi-sport athletes carrying shoes, balls, rackets, and sweat-soaked apparel. Features an isolated, odor-ventilated shoe compartment and convertible padded straps that switch from duffel to backpack in seconds.',
    specs: [
      { label: 'Volume', value: '45 Liters' },
      { label: 'Shell Material', value: '840D Ballistic Nylon with TPU Water-Repellent Coating' },
      { label: 'Zippers', value: 'YKK Aquaguard water-resistant zippers' },
      { label: 'Shoe Compartment', value: 'Fits up to Men’s US 14 cleats/shoes' },
      { label: 'Laptop Sleeve', value: 'Padded 16" protective compartment' }
    ],
    features: [
      'Laser-cut ventilation ports allow damp gym apparel to breathe',
      'Fleece-lined optics pocket protects sport sunglasses and phone',
      'Reinforced bottom panel with abrasion-resistant rubber bumpers',
      'Convertible backpack harness with sternum stabilizer strap'
    ],
    stock: 24,
    optionsName: 'Colorway',
    options: ['Stealth Charcoal / Hyper Volt', 'All-Black Matte', 'Deep Navy Sport'],
    skillLevel: 'All-Rounder',
    badge: 'Weatherproof 45L',
    isFeatured: false,
    reviews: [
      {
        id: 'rev-10',
        author: 'Samira Patel',
        rating: 5,
        date: '1 month ago',
        verified: true,
        title: 'The ultimate sports bag',
        comment: 'Carries my tennis racket, change of gym clothes, protein shaker, and size 10 shoes with room to spare. Incredible build quality.'
      }
    ]
  }
];

export const CATEGORIES: { id: SportCategory; name: string; count: number }[] = [
  { id: 'all', name: 'All Gear', count: 8 },
  { id: 'basketball', name: 'Basketball', count: 1 },
  { id: 'running', name: 'Running & Track', count: 1 },
  { id: 'tennis', name: 'Tennis & Rackets', count: 1 },
  { id: 'training', name: 'Strength & Conditioning', count: 2 },
  { id: 'soccer', name: 'Soccer / Football', count: 1 },
  { id: 'accessories', name: 'Accessories & Recovery', count: 2 },
];

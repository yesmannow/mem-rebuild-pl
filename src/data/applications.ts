export interface Application {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  accentGradient?: string;
  category: string[];
  tags: string[];
  thumbnail: string;
  demoUrl: string;
  githubUrl?: string;
  overview: string;
  valueProposition: {
    problem: string;
    solution: string;
    impact: string[];
  };
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  technicalDetails: {
    architecture: string;
    techStack: string[];
    keyComponents: {
      name: string;
      purpose: string;
      complexity: string;
    }[];
    codeHighlights: {
      title: string;
      description: string;
      language: string;
      snippet?: string;
    }[];
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const applications: Application[] = [
  {
    id: 'gt9-pricing-sheet',
    title: 'GT9 Smart Pricing Tool',
    tagline: 'Intelligent pricing and quote generation for Graston Technique products and training',
    icon: '💎',
    accentGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    category: ['Sales Tools', 'E-Commerce'],
    tags: ['JavaScript', 'Interactive UI', 'Quote Generation', 'Sales Automation'],
    thumbnail: '/apps/gt9-pricing-thumbnail.png',
    demoUrl: 'https://jacob-darling-portfolio-meme.vercel.app/demos/gt9_pricing_sheet',
    overview:
      'A sophisticated sales enablement tool that transforms the complex Graston Technique product catalog into an intuitive, searchable interface with real-time quote building, customer segmentation, and professional quote generation capabilities.',
    valueProposition: {
      problem:
        'Sales teams struggled with a fragmented product catalog spanning training courses, instrument bundles, and memberships with varying prices across customer segments (retail, corporate, student/military). Manually creating quotes was time-consuming and error-prone.',
      solution:
        'Built an intelligent pricing tool that consolidates the entire catalog, enables instant search/filtering, supports dynamic pricing by customer type, and generates professional quotes via email with a single click.',
      impact: [
        'Reduced quote generation time from 15+ minutes to under 2 minutes',
        'Eliminated pricing errors through automated calculations',
        'Increased sales team productivity by 40%',
        'Enhanced customer experience with instant, accurate pricing',
      ],
    },
    features: [
      {
        title: 'Smart Search & Filtering',
        description:
          'Real-time keyword search across products, categories, and tags with instant results filtering by customer type and category',
        icon: '🔍',
      },
      {
        title: 'Dynamic Customer Segmentation',
        description:
          'Automatic price adjustment based on customer type (Retail/Corporate/Student-Military) with clear pricing display for each segment',
        icon: '👥',
      },
      {
        title: 'Interactive Quote Builder',
        description:
          'Live quote accumulator showing selected items, quantities, and running total with one-click quote generation',
        icon: '📋',
      },
      {
        title: 'Payment Plan Calculator',
        description:
          'Built-in financing calculator showing monthly payment options (6/12/18 months) for qualifying products',
        icon: '💳',
      },
      {
        title: 'Professional Quote Export',
        description:
          'Generates formatted quotes with customer info, itemized pricing, terms, and next steps - ready to email',
        icon: '📧',
      },
    ],
    technicalDetails: {
      architecture:
        'Client-side single-page application built with vanilla JavaScript for maximum performance and zero dependencies. Uses a data-driven architecture with structured product objects enabling easy maintenance and scalability.',
      techStack: [
        'Vanilla JavaScript (ES6+)',
        'HTML5 Semantic Markup',
        'CSS3 with Custom Properties',
        'Google Fonts (Montserrat)',
        'Local Storage API',
      ],
      keyComponents: [
        {
          name: 'Product Data Structure',
          purpose: 'Centralized product catalog with pricing tiers, features, and metadata',
          complexity: 'Medium - Nested objects with category hierarchies and pricing matrices',
        },
        {
          name: 'Search Algorithm',
          purpose: 'Multi-field fuzzy search across titles, descriptions, keywords, and tags',
          complexity: 'Medium - Real-time filtering with case-insensitive matching',
        },
        {
          name: 'Quote State Management',
          purpose: 'Maintains active quote with items, quantities, customer type, and totals',
          complexity:
            'High - Manages complex state with add/remove/update operations and price recalculations',
        },
        {
          name: 'Dynamic UI Rendering',
          purpose: 'Conditionally displays product cards, pricing tiers, and quote summaries',
          complexity: 'Medium - Event-driven DOM manipulation with smooth transitions',
        },
        {
          name: 'Quote Generation Engine',
          purpose: 'Formats professional quote text with customer details, itemization, and terms',
          complexity: 'Medium - Template-based generation with customer data merge',
        },
      ],
      codeHighlights: [
        {
          title: 'Dynamic Price Display by Customer Type',
          description:
            'Intelligently shows/hides pricing tiers based on selected customer segment while maintaining data integrity',
          language: 'javascript',
          snippet: `function filterByCustomer() {
    currentCustomerType = document.getElementById('customerType').value;
    const priceRows = document.querySelectorAll('.price-row');

    priceRows.forEach(row => {
        const label = row.querySelector('.price-label').textContent.toLowerCase();

        if (currentCustomerType === 'all') {
            row.style.display = 'flex';
        } else if (currentCustomerType === 'retail' && label.includes('list')) {
            row.style.display = 'flex';
        } else if (currentCustomerType === 'corporate' && label.includes('corporate')) {
            row.style.display = 'flex';
        } else if (currentCustomerType === 'student' && label.includes('student')) {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
}`,
        },
        {
          title: 'Quote State Management',
          description:
            'Maintains quote integrity with quantity tracking, price calculations, and customer-specific pricing',
          language: 'javascript',
          snippet: `function addToQuote(buttonElement, productName, retailPrice, corpPrice, studentPrice) {
    let price = retailPrice;
    if (currentCustomerType === 'corporate') price = corpPrice;
    if (currentCustomerType === 'student') price = studentPrice;

    const existingItem = currentQuote.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentQuote.push({
            name: productName,
            retailPrice: retailPrice,
            corpPrice: corpPrice,
            studentPrice: studentPrice,
            quantity: 1
        });
    }

    updateQuoteDisplay();
    // Visual feedback animation
    const card = buttonElement.closest('.product-card');
    card.classList.add('in-quote');
}`,
        },
        {
          title: 'Real-Time Search with Keyword Matching',
          description: 'Multi-field search across product attributes with instant visual feedback',
          language: 'javascript',
          snippet: `function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const keywords = card.getAttribute('data-keywords') || '';
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();

        const matches = keywords.includes(searchTerm) ||
                      title.includes(searchTerm) ||
                      description.includes(searchTerm);

        card.style.display = matches || searchTerm === '' ? 'block' : 'none';
    });
}`,
        },
      ],
    },
    metrics: [
      { label: 'Products Cataloged', value: '50+' },
      { label: 'Pricing Tiers', value: '3' },
      { label: 'Quote Gen Speed', value: '<2 min' },
      { label: 'Error Reduction', value: '100%' },
    ],
  },
  {
    id: 'license-requirements-tool',
    title: 'Practitioner License Requirements Hub',
    tagline: 'State-by-state continuing education requirements for healthcare professionals',
    icon: '🗺️',
    accentGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    category: ['Education Tools', 'Compliance'],
    tags: ['JavaScript', 'Data Visualization', 'Regulatory Compliance', 'Multi-State'],
    thumbnail: '/apps/license-requirements-thumbnail.png',
    demoUrl:
      'https://jacob-darling-portfolio-meme.vercel.app/demos/Practitioner%20License%20Requirements%20-%20Tool%20for%20Website.htm',
    overview:
      'A comprehensive, interactive tool providing instant access to continuing education (CE) requirements for Physical Therapists, Occupational Therapists, Chiropractors, Athletic Trainers, and Massage Therapists across all 50 states plus DC and Puerto Rico.',
    valueProposition: {
      problem:
        'Healthcare professionals waste hours researching state-specific CE requirements across fragmented board websites. Outdated information leads to compliance risks and license renewal delays.',
      solution:
        'Centralized, searchable database of CE requirements for 5 professions across 52 jurisdictions with real-time updates and direct links to official licensing boards.',
      impact: [
        'Reduced research time from hours to seconds',
        'Eliminated compliance anxiety with accurate, current data',
        'Increased course enrollment by 35% through education',
        'Positioned brand as trusted compliance resource',
      ],
    },
    features: [
      {
        title: 'Multi-Profession Support',
        description:
          'Covers PT/PTA, OT/OTA, DC, AT, and MT with profession-specific requirements and nuances',
        icon: '🏥',
      },
      {
        title: 'Comprehensive State Coverage',
        description:
          'All 50 states, DC, and Puerto Rico with direct links to official licensing boards',
        icon: '🗺️',
      },
      {
        title: 'Intelligent Data Display',
        description:
          'Shows requirements, renewal cycles, special mandates (ethics, jurisprudence), and state-specific notes',
        icon: '📊',
      },
      {
        title: 'BOC/NBCOT Integration',
        description:
          'Displays national certification requirements alongside state-specific rules for AT and OT',
        icon: '🎓',
      },
      {
        title: 'Tabbed Navigation',
        description:
          'Clean interface with profession-based tabs for easy switching between disciplines',
        icon: '📑',
      },
    ],
    technicalDetails: {
      architecture:
        'Modular, data-driven architecture with separated concerns: data layer (state objects), presentation layer (dynamic UI), and interaction layer (event handling). Built for maintainability with easy data updates.',
      techStack: [
        'Vanilla JavaScript (ES6+)',
        'HTML5 Semantic Structure',
        'CSS3 Grid & Flexbox',
        'Google Fonts (Montserrat, Droid Sans)',
        'Responsive Design Patterns',
      ],
      keyComponents: [
        {
          name: 'State Data Objects',
          purpose: 'Structured data for each profession containing all state requirements',
          complexity: 'High - 52 jurisdictions × 5 professions with varying data structures',
        },
        {
          name: 'Dynamic Hub Generator',
          purpose: 'Reusable function that builds complete interface from data + field mappings',
          complexity:
            'High - Generic component handles PT hours vs. DC renewal cycles vs. AT regulation types',
        },
        {
          name: 'Tab Navigation System',
          purpose:
            'Switches between professions while maintaining state and preventing layout shifts',
          complexity: 'Medium - Event delegation with active state management',
        },
        {
          name: 'Field Mapping Engine',
          purpose: 'Maps generic data structure to profession-specific display requirements',
          complexity: 'Medium - Configuration-driven rendering',
        },
        {
          name: 'Responsive Dropdown',
          purpose: 'State selector with sorted alphabetical display and instant requirement reveal',
          complexity: 'Low - Event-driven show/hide with smooth transitions',
        },
      ],
      codeHighlights: [
        {
          title: 'Reusable Hub Initialization Function',
          description:
            'Generic function that builds complete profession-specific interface from data and configuration',
          language: 'javascript',
          snippet: `function initializeHub(hubType, dataObject, fieldMapping) {
    const container = document.getElementById(hubType);
    if (!container || !dataObject) return;

    // Inject HTML structure dynamically
    container.innerHTML = \`
        <div class="hub-component">
            <h2>\${fieldMapping.title}</h2>
            <p class="hub-subtitle">\${fieldMapping.subtitle}</p>
            \${fieldMapping.infoBox ? \`<div class="info-box">\${fieldMapping.infoBox}</div>\` : ''}
            <div class="selector-wrapper">
                <select id="stateSelector_\${hubType}">
                    <option value="">-- Select Your State --</option>
                </select>
            </div>
            <div id="results-display_\${hubType}" class="results-display">
                <!-- Dynamic content here -->
            </div>
        </div>\`;

    // Populate states, attach events
    const selector = container.querySelector(\`#stateSelector_\${hubType}\`);
    const sortedStates = Object.keys(dataObject).sort((a, b) =>
        dataObject[a].stateName.localeCompare(dataObject[b].stateName)
    );

    sortedStates.forEach(stateCode => {
        const option = document.createElement('option');
        option.value = stateCode;
        option.textContent = dataObject[stateCode].stateName;
        selector.appendChild(option);
    });
}`,
        },
        {
          title: 'Profession-Specific Field Mappings',
          description:
            "Configuration objects define how each profession's data should be displayed without code duplication",
          language: 'javascript',
          snippet: `const mappings = {
    pt: {
        title: 'Physical Therapy (PT & PTA) State License Requirements',
        subtitle: 'Select your state to find CEU requirements.',
        col1_header: 'PT Requirements',
        col1_id: 'ptHours',
        col2_header: 'PTA Requirements',
        col2_id: 'ptaHours',
        col3_header: 'State-Specific Notes',
        col3_id: 'notes',
        disclaimer: 'It is the licensee\\'s responsibility to verify all CEU requirements.'
    },
    dc: {
        title: 'Chiropractic State License Requirements',
        subtitle: 'Select your state to find CEU requirements.',
        col1_header: 'CEUs Required',
        col1_id: 'totalHours',
        col2_header: 'Renewal Cycle',
        col2_id: 'renewalCycle',
        col3_header: 'Renewal Details & Notes',
        col3_id: 'notes'
    }
    // ... other professions
};`,
        },
        {
          title: 'Structured State Data with Rich Metadata',
          description:
            'Each state entry contains board name, URL, hours, renewal info, and special mandates',
          language: 'javascript',
          snippet: `const stateData_pt = {
    "AL": {
        stateName: "Alabama",
        boardName: "Alabama Board of Physical Therapy",
        boardUrl: "http://www.pt.alabama.gov/",
        ptHours: "10 Hours",
        ptaHours: "10 Hours",
        notes: "Renewed annually. Requires 2-hour AL Jurisprudence course every 5 years."
    },
    "CA": {
        stateName: "California",
        boardName: "Physical Therapy Board of California",
        boardUrl: "https://www.ptbc.ca.gov/",
        ptHours: "30 Hours",
        ptaHours: "30 Hours",
        notes: "Requires 2 hrs Ethics/Laws & 4 hrs Basic Life Support. First renewal only 15 hours."
    }
    // ... 50 more states
};`,
        },
      ],
    },
    metrics: [
      { label: 'States Covered', value: '52' },
      { label: 'Professions', value: '5' },
      { label: 'Data Points', value: '260+' },
      { label: 'Research Time Saved', value: '98%' },
    ],
  },
  {
    id: 'roi-calculator',
    title: 'Essential Training ROI Calculator',
    tagline: 'Interactive investment and return calculator for Graston Technique training bundles',
    icon: '📈',
    accentGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    category: ['Sales Tools', 'Financial Planning'],
    tags: ['JavaScript', 'ROI Modeling', 'Interactive Forms', 'Data Visualization'],
    thumbnail: '/apps/roi-calculator-thumbnail.png',
    demoUrl:
      'https://jacob-darling-portfolio-meme.vercel.app/demos/ROI%20Calculator%20-%20Essential%20Training%20Large.htm',
    overview:
      'A sophisticated financial planning tool that helps clinicians understand the business case for Graston Technique training by calculating projected revenue, break-even time, and return on investment based on their specific practice parameters.',
    valueProposition: {
      problem:
        'Clinicians hesitated to invest in GT training due to uncertainty about financial return. Sales conversations focused on cost rather than value, leading to objection-heavy cycles.',
      solution:
        'Built an interactive calculator that transforms practice metrics (reimbursement rates, patient volume) into clear ROI projections, demonstrating break-even in weeks and revenue potential.',
      impact: [
        'Increased training enrollment by 28%',
        'Reduced sales cycle length by 40%',
        'Shifted conversation from cost to value',
        'Provided tangible business justification for decision-makers',
      ],
    },
    features: [
      {
        title: 'Practice Parameter Inputs',
        description:
          'Dual-input sliders and text fields for average reimbursement and weekly treatment sessions with real-time validation',
        icon: '💰',
      },
      {
        title: 'Bundle Selection',
        description:
          'Dropdown showcasing training bundles with full feature lists and regular vs. sale pricing display',
        icon: '📦',
      },
      {
        title: 'Real-Time ROI Calculation',
        description:
          'Instant calculation of weekly revenue, monthly revenue, and break-even time as inputs change',
        icon: '📈',
      },
      {
        title: 'Dual Input Synchronization',
        description:
          'Seamless sync between range sliders and text inputs with error handling and validation',
        icon: '🔄',
      },
      {
        title: 'Professional Results Display',
        description: 'Clean, card-based results with large, readable metrics and clear labeling',
        icon: '📊',
      },
    ],
    technicalDetails: {
      architecture:
        'Event-driven architecture with state management for input values, bundle selection, and calculated results. Uses the Observer pattern for input synchronization and immediate UI updates.',
      techStack: [
        'Vanilla JavaScript (ES6+)',
        'HTML5 Range & Text Inputs',
        'CSS3 Custom Properties',
        'Google Fonts (Lato, Montserrat)',
        'Responsive Flexbox Layout',
      ],
      keyComponents: [
        {
          name: 'Slider-Input Synchronization',
          purpose: 'Bidirectional sync between range sliders and text inputs with validation',
          complexity: 'High - Handles manual input validation, currency formatting, and edge cases',
        },
        {
          name: 'Bundle Data Structure',
          purpose: 'Rich product objects with features, pricing tiers, and display metadata',
          complexity: 'Medium - Nested objects with regular/sale pricing and feature arrays',
        },
        {
          name: 'ROI Calculation Engine',
          purpose: 'Performs multi-step calculations: weekly → monthly revenue, break-even time',
          complexity: 'Medium - Handles currency formatting, zero-division protection, rounding',
        },
        {
          name: 'Dynamic Bundle Display',
          purpose: 'Updates bundle name, pricing, and feature list based on selection',
          complexity: 'Medium - DOM manipulation with conditional pricing display',
        },
        {
          name: 'Input Validation System',
          purpose: 'Real-time validation with visual error states and helpful messaging',
          complexity: 'Medium - Multiple validation rules with user-friendly feedback',
        },
      ],
      codeHighlights: [
        {
          title: 'Bidirectional Slider-Input Synchronization',
          description:
            'Complex sync logic handling slider movements, manual text input, validation, and formatting',
          language: 'javascript',
          snippet: `function syncSliderAndInputValue(slider, valueInput, errorElement, formatFunc) {
    valueInput.value = formatFunc(slider.value);

    slider.addEventListener('input', function () {
        valueInput.value = formatFunc(this.value);
        errorElement.style.display = 'none';
        valueInput.classList.remove('error');
        performCalculations();
    });

    valueInput.addEventListener('change', function () {
        const cleanedValue = this.value.replace(/[$,]/g, '').trim();
        let numValue = parseFloat(cleanedValue);
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);

        if (isNaN(numValue) || cleanedValue === '' || numValue < min || numValue > max) {
            errorElement.style.display = 'block';
            valueInput.classList.add('error');
            numValue = Number(slider.value);
        } else {
            errorElement.style.display = 'none';
            valueInput.classList.remove('error');
        }

        slider.value = numValue;
        valueInput.value = formatFunc(numValue);
        performCalculations();
    });
}`,
        },
        {
          title: 'ROI Calculation Logic',
          description:
            'Multi-step calculation with customer-specific pricing and break-even modeling',
          language: 'javascript',
          snippet: `function performCalculations() {
    const reimbursement = parseFloat(reimbursementValueInput.value.replace(/[$,]/g, ''));
    const patients = Number(patientsValueInput.value);
    const bundleCost = Number(bundleSelector.value);

    const weeklyRevenue = reimbursement * patients;
    const monthlyRevenue = weeklyRevenue * 4;

    // Prevent division by zero
    const breakEvenWeeks = weeklyRevenue > 0 ? Math.ceil(bundleCost / weeklyRevenue) : 0;

    // Update UI with formatted values
    weeklyRevenueEl.textContent = formatCurrency(weeklyRevenue);
    monthlyRevenueEl.textContent = formatCurrency(monthlyRevenue);
    breakEvenTimeEl.textContent = \`~\${breakEvenWeeks} Weeks\`;
}`,
        },
        {
          title: 'Dynamic Bundle Details Rendering',
          description:
            'Conditional pricing display showing sale prices with strikethrough regular prices when applicable',
          language: 'javascript',
          snippet: `function updateBundleDetails(bundleValue) {
    const bundle = bundleData[bundleValue];
    if (bundle) {
        bundleNameEl.textContent = bundle.name;

        bundlePriceEl.innerHTML = '';
        if (bundle.regularPrice && bundle.regularPrice !== bundle.salePrice) {
            const regularPriceSpan = document.createElement('span');
            regularPriceSpan.classList.add('regular-price');
            regularPriceSpan.textContent = \`$\${bundle.regularPrice.toLocaleString()}\`;
            bundlePriceEl.appendChild(regularPriceSpan);
        }
        const salePriceSpan = document.createElement('span');
        salePriceSpan.classList.add('sale-price');
        salePriceSpan.textContent = \`$\${bundle.salePrice.toLocaleString()}\`;
        bundlePriceEl.appendChild(salePriceSpan);

        bundleFeaturesEl.innerHTML = '';
        bundle.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            bundleFeaturesEl.appendChild(li);
        });

        performCalculations();
    }
}`,
        },
      ],
    },
    metrics: [
      { label: 'Training Bundles', value: '6' },
      { label: 'Real-Time Calculations', value: '3' },
      { label: 'Enrollment Increase', value: '+28%' },
      { label: 'Sales Cycle Reduction', value: '40%' },
    ],
  },
  {
    id: 'clinical-compass',
    title: 'Graston Clinical Compass',
    tagline: 'A Digital Mentor for Clinical Excellence.',
    icon: '🧭',
    accentGradient: 'linear-gradient(135deg, #7C5CFF 0%, #C084FC 100%)',
    category: ['Clinical Tools', 'Education'],
    tags: [
      'JavaScript',
      'Clinical Decision Support',
      'Protocol Generation',
      'Interactive Workflow',
    ],
    thumbnail: '/apps/clinical-compass-thumbnail.png',
    demoUrl:
      'https://jacob-darling-portfolio-meme.vercel.app/demos/Graston%20Clinical%20Compass%20-%20%20clinical%20reasoning%20and%20treatment%20protocol.htm',
    overview:
      'A sophisticated clinical decision support tool that guides practitioners through evidence-based treatment protocol development using a step-by-step questionnaire, integrating clinical reasoning, anatomical knowledge, and instrument selection into actionable treatment plans.',
    valueProposition: {
      problem:
        'New Graston practitioners struggled to translate training into real-world treatment planning. Uncertainty about instrument selection, stroke techniques, and protocol sequencing led to suboptimal outcomes and practitioner anxiety.',
      solution:
        'Built an intelligent wizard that walks clinicians through clinical reasoning steps (principles → patient profile → assessment → refinement) and generates customized, evidence-based treatment protocols with instrument rationale.',
      impact: [
        'Reduced new practitioner anxiety by 65%',
        'Improved treatment consistency and outcomes',
        'Accelerated clinical competency development',
        'Positioned as essential post-training resource',
      ],
    },
    features: [
      {
        title: '4-Step Clinical Workflow',
        description:
          'Guided progression through Principles → Patient Profile → Clinical Assessment → Refinement with validation at each step',
        icon: '🧭',
      },
      {
        title: 'Intelligent Protocol Generation',
        description:
          'Creates customized treatment protocols based on anatomical region, pathology, tissue findings, and clinical modifiers',
        icon: '🎯',
      },
      {
        title: 'Instrument Education Library',
        description:
          'Rich modal dialogs with instrument images, clinical rationale, and application guidance for GT1-GT6',
        icon: '🔧',
      },
      {
        title: 'Progress Tracking UI',
        description:
          'Visual progress bar with step indicators, completion checkmarks, and jump-to-step navigation',
        icon: '📊',
      },
      {
        title: 'Printable Protocol Output',
        description:
          'Generates professional summary with treatment areas, stroke techniques, instruments, and adjunctive care recommendations',
        icon: '🖨️',
      },
    ],
    technicalDetails: {
      architecture:
        'Multi-step wizard architecture with state machine managing workflow progression, input validation, and conditional logic. Protocol generation uses template-based rendering with data-driven instrument recommendations.',
      techStack: [
        'Vanilla JavaScript (ES6+)',
        'CSS3 Animations & Transitions',
        'HTML5 Semantic Forms',
        'Google Fonts (Inter, Montserrat)',
        'Modal Dialog Patterns',
      ],
      keyComponents: [
        {
          name: 'Protocol Data Structure',
          purpose:
            'Hierarchical data defining regions → pathologies → base protocols → clinical modifiers',
          complexity:
            'High - Nested objects with treatment arrays, instrument mappings, and conditional findings',
        },
        {
          name: 'Instrument Knowledge Base',
          purpose:
            'Rich educational content for each instrument with images, rationale, and clinical guidance',
          complexity: 'Medium - Structured objects with HTML content and image references',
        },
        {
          name: 'Wizard State Machine',
          purpose:
            'Manages step progression, validation, back/forward navigation, and completion state',
          complexity: 'High - Complex state with validation rules and conditional logic',
        },
        {
          name: 'Dynamic Dropdown Population',
          purpose: 'Cascading dropdowns where region selection populates pathology options',
          complexity: 'Medium - Event-driven dependency management',
        },
        {
          name: 'Protocol Generation Engine',
          purpose:
            'Assembles final protocol from user selections, applies modifiers, formats output',
          complexity: 'High - Template rendering with conditional sections and formatted tables',
        },
        {
          name: 'Modal Education System',
          purpose:
            'Displays rich instrument information in overlay dialogs with images and detailed text',
          complexity: 'Medium - Event delegation for dynamic content loading',
        },
      ],
      codeHighlights: [
        {
          title: 'Hierarchical Protocol Data Structure',
          description:
            'Complex nested data defining regions, pathologies, base protocols, and conditional clinical findings',
          language: 'javascript',
          snippet: `const protocolData = {
    cervicalSpine: {
        displayName: "Cervical Spine",
        pathologies: {
            general: {
                displayName: "General Dysfunction / Postural Strain",
                baseProtocol: [
                    {
                        area: "Upper Trapezius / Levator Scapulae",
                        stroke: "Sweep, Fan",
                        instruments: "GT1, GT4, GT5"
                    },
                    {
                        area: "Cervical Paraspinals (Laminar Groove)",
                        stroke: "J-Stroke",
                        instruments: "GT3"
                    }
                ],
                findings: {
                    headaches: {
                        text: "Focus on releasing suboccipital tension, a common driver of cervicogenic headaches."
                    },
                    forwardHead: {
                        text: "Address shortened anterior structures. Include framing of the clavicle and light sweeps over SCM."
                    }
                },
                adjunctiveCare: "Stretching of upper traps & pectorals. Strengthening of deep neck flexors & scapular retractors."
            }
        }
    }
};`,
        },
        {
          title: 'Step Progression with Validation',
          description:
            'Wizard navigation with validation gates ensuring clinical workflow integrity',
          language: 'javascript',
          snippet: `nextBtn.addEventListener('click', () => {
    if (!validateCurrentStep()) return;

    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
        showAlert(\`Moved to step \${currentStep + 1}\`, 'success');
    } else {
        generateProtocol();
    }
});

function validateCurrentStep() {
    if (currentStep === 0) {
        const allChecked = Array.from(principleCheckboxes).every(cb => cb.checked);
        if (!allChecked) {
            showAlert('Please acknowledge all core principles before continuing.', 'warning');
            return false;
        }
    }
    return true;
}`,
        },
        {
          title: 'Dynamic Protocol Generation',
          description:
            'Template-based protocol assembly with conditional sections and formatted output',
          language: 'javascript',
          snippet: `function generateProtocol() {
    const pathologyData = protocolData[regionKey].pathologies[pathologyKey];
    const selectedFindings = Array.from(document.querySelectorAll('input[name="findings"]:checked'))
        .map(cb => cb.value);

    let protocolTable = '<table><thead><tr><th>Treatment Area</th><th>Stroke Technique</th><th>Recommended Instruments</th></tr></thead><tbody>';

    pathologyData.baseProtocol.forEach(protocol => {
        const instrumentLinks = protocol.instruments.split(', ').map(inst => {
            return \`<a href="javascript:void(0);" class="instrument-link" onclick="showInstrumentInfo('\${inst}')">\${inst}</a>\`;
        }).join(', ');

        protocolTable += \`<tr>
            <td>\${protocol.area}</td>
            <td>\${protocol.stroke}</td>
            <td>\${instrumentLinks}</td>
        </tr>\`;
    });

    protocolTable += '</tbody></table>';

    // Build findings section if applicable
    let findingsSection = '';
    if (selectedFindings.length > 0) {
        findingsSection = '<h4>Clinical Considerations</h4><ul>';
        selectedFindings.forEach(finding => {
            if (pathologyData.findings[finding]) {
                findingsSection += \`<li>\${pathologyData.findings[finding].text}</li>\`;
            }
        });
        findingsSection += '</ul>';
    }

    resultContainer.innerHTML = \`
        <h3>Clinical Protocol Summary</h3>
        \${protocolTable}
        \${findingsSection}
        <h4>Adjunctive Care Recommendations</h4>
        <p>\${pathologyData.adjunctiveCare}</p>
    \`;
}`,
        },
        {
          title: 'Rich Instrument Education System',
          description:
            'Modal dialog system displaying detailed instrument information with images and clinical guidance',
          language: 'javascript',
          snippet: `const instrumentData = {
    'GT1': {
        name: 'GT1: Scanner',
        image: '/images/applications/graston-gt1.svg',
        rationale: \`The largest Graston instrument, GT1 is expertly designed for "scanning" and treating large muscle groups and fascia. Its broad, gently convex edges allow clinicians to quickly assess tissue texture and efficiently treat areas such as hamstrings, quadriceps, and the back.<br><br>
        <strong>Key Features:</strong><br>
        • Broad, convex surfaces for coverage<br>
        • Ideal for quick tissue assessment and warm-up<br>
        • Comfortable for both practitioner and patient<br><br>
        <em>"The GT1's unique shape allows for effective sweeping and fanning strokes on larger muscles."</em>\`
    }
    // ... GT2 through GT6
};

function showInstrumentInfo(instCode) {
    const data = instrumentData[instCode];
    if (!data) return;

    modalBody.innerHTML = \`
        <h3>\${data.name}</h3>
        <img src="\${data.image}" alt="\${data.name}" onerror="this.style.display='none'">
        <p>\${data.rationale}</p>
    \`;
    modal.style.display = "block";
}`,
        },
      ],
    },
    metrics: [
      { label: 'Clinical Pathways', value: '15+' },
      { label: 'Instrument Profiles', value: '6' },
      { label: 'Practitioner Anxiety Reduction', value: '65%' },
      { label: 'Protocol Accuracy', value: '100%' },
    ],
    testimonial: {
      quote:
        "The Clinical Compass transformed how I approach treatment planning. What used to take me 20 minutes of flipping through my manual now takes 2 minutes and gives me confidence I'm following best practices.",
      author: 'Dr. Sarah Mitchell',
      role: 'PT, DPT - Sports Medicine Clinic',
    },
  },
  {
    id: 'graston-growth-engine',
    title: 'Graston Growth Engine',
    tagline:
      'Comprehensive provider platform with analytics hub, marketing toolkit, and growth tools',
    icon: '🚀',
    accentGradient: 'linear-gradient(135deg, #88ABF2 0%, #EC4899 100%)',
    category: ['Marketing Platform', 'Analytics', 'Provider Tools'],
    tags: ['WordPress', 'PHP', 'Google Analytics API', 'Chart.js', 'SQL', 'React', 'REST API'],
    thumbnail: '/apps/graston-growth-engine-thumbnail.png',
    demoUrl: 'https://dazzling-tiger-zoom.vercel.app/',
    githubUrl: 'https://github.com/JdarlingGT/graston-growth-engine',
    overview:
      'A sophisticated multi-platform ecosystem that transforms provider membership from a passive directory listing into an active growth engine. Combines real-time analytics, AI-powered marketing tools, interactive calculators, and a comprehensive resource library to prove ROI, drive engagement, and reduce churn. Built as a WordPress backend with React frontend components, integrated with Google Analytics API for data-driven insights and peer benchmarking.',
    valueProposition: {
      problem:
        "The provider directory was a 'black box'—practitioners had no visibility into whether their membership was driving traffic or generating leads. At every renewal, this uncertainty created significant churn risk as members questioned the value of their investment. Support teams were overwhelmed with requests for performance data, and sales conversations lacked concrete proof of value.",
      solution:
        'Built a comprehensive growth platform that provides transparent, data-driven insights into directory performance while empowering providers with marketing tools, ROI calculators, and educational resources. The analytics hub fetches real-time Google Analytics data, stores it efficiently in WordPress postmeta, and visualizes performance with peer benchmarking. The marketing toolkit leverages AI to generate practice-specific content. Together, these tools transform membership into an undeniable value proposition.',
      impact: [
        'Reduced member churn by 42% through transparent ROI proof',
        'Decreased support tickets by 73% with self-serve analytics',
        'Increased profile optimization engagement by 58%',
        'Created natural upsell pathway for premium listings',
        'Improved member retention rate from 68% to 91%',
        'Generated $847K in additional annual recurring revenue',
      ],
    },
    features: [
      {
        title: 'Provider Analytics Hub (The Spotlight)',
        description:
          'Real-time dashboard showing profile views, website clicks, top traffic sources, and peer benchmarking. Powered by nightly Google Analytics API sync with optimized SQL queries for instant load times.',
        icon: '📊',
      },
      {
        title: 'Interactive Map-Based Directory',
        description:
          'Advanced provider search with 94 providers across multiple specialties. Features location filtering, specialty filters, membership tier badges, and mobile-optimized map interface.',
        icon: '🗺️',
      },
      {
        title: 'AI-Powered Marketing Toolkit',
        description:
          'Premier member benefit providing AI-generated social media templates, patient intake forms, brand style guides, Instagram stories, and customizable marketing collateral.',
        icon: '🤖',
      },
      {
        title: 'Practice ROI Calculator',
        description:
          'Interactive tool showing providers how quickly Premier membership pays for itself. Calculates estimated annual revenue from 1-5 new patients per month with dynamic updates.',
        icon: '💰',
      },
      {
        title: 'Comprehensive Resource Library',
        description:
          'Searchable repository of educational materials, FAQs, onboarding guides, and contact support—reducing friction and empowering self-service.',
        icon: '📚',
      },
      {
        title: 'Peer Benchmarking Engine',
        description:
          "Custom SQL queries calculate average performance metrics across all providers, displaying individual performance vs. peer average (e.g., '+18% more clicks than average') to motivate engagement.",
        icon: '📈',
      },
      {
        title: 'Membership Tier System',
        description:
          'Three-tier structure (Basic, Premier, Featured) with clear feature differentiation and comparison tables driving upgrades.',
        icon: '⭐',
      },
      {
        title: 'Provider Success Stories',
        description:
          'Social proof showcasing real practitioners with metrics (99% Satisfaction, 156 Patients Served) building credibility and demonstrating program effectiveness.',
        icon: '🎯',
      },
    ],
    technicalDetails: {
      architecture:
        'Hybrid WordPress/React architecture with WordPress backend managing provider data, user authentication, and content while React components power interactive features. Google Analytics Data API (GA4) integration runs via nightly WP Cron jobs, fetching metrics and storing in postmeta for fast retrieval. Frontend uses Chart.js for data visualization, with AJAX for secure data fetching. Custom SQL optimization ensures peer benchmarking calculations remain performant at scale.',
      techStack: [
        'WordPress 6.x (Backend CMS)',
        'PHP 8.x (Server-Side Logic)',
        'React 18 (Interactive Components)',
        'Google Analytics Data API (GA4)',
        'Chart.js (Data Visualization)',
        'MySQL (Custom Queries)',
        'WP Cron (Automated Tasks)',
        'REST API (WordPress)',
        'JavaScript (ES6+)',
        'CSS3 & Flexbox',
        'AJAX (Async Data)',
        'Vercel (Frontend Hosting)',
        'Responsive Design',
      ],
      keyComponents: [
        {
          name: 'Google Analytics API Integration',
          purpose:
            'Nightly WP Cron job authenticating with GA4 API, fetching provider-specific metrics, and storing in WordPress postmeta for instant dashboard access',
          complexity:
            'High - API authentication, rate limiting, error handling, data transformation, and storage orchestration',
        },
        {
          name: 'postmeta Storage Layer',
          purpose:
            'Efficient WordPress postmeta storage mapping analytics data to provider profiles, creating fast local data source avoiding repeated API calls',
          complexity:
            'Medium - Strategic denormalization with update conflict management and data freshness tracking',
        },
        {
          name: 'Analytics Dashboard Component',
          purpose:
            'React component fetching stored analytics via AJAX and rendering interactive Chart.js visualizations (line graphs for trends, bar charts for traffic sources)',
          complexity:
            'High - State management, async data loading, responsive chart rendering, and error boundary handling',
        },
        {
          name: 'Peer Benchmarking SQL Engine',
          purpose:
            'Custom optimized SQL queries calculating average performance metrics across all providers with WHERE clauses for tier-based comparisons',
          complexity:
            'High - Query optimization for N+1 prevention, caching strategies, and real-time average calculations',
        },
        {
          name: 'Provider Directory Map System',
          purpose:
            'Interactive map with location-based filtering, radius search, specialty taxonomy, and mobile-responsive controls',
          complexity:
            'Medium - Geolocation APIs, marker clustering, filter state management, and responsive map controls',
        },
        {
          name: 'Marketing Toolkit Resource Manager',
          purpose:
            'Dynamic content delivery system for downloadable templates, AI-generated suggestions, and tier-gated premium content',
          complexity:
            'Medium - Access control, file management, dynamic content generation, and download tracking',
        },
        {
          name: 'ROI Calculator React Component',
          purpose:
            'Interactive calculator with dual slider inputs, real-time calculations, and visual revenue projections with smooth animations',
          complexity:
            'Medium - Controlled inputs, validation, currency formatting, and responsive chart updates',
        },
        {
          name: 'WP Cron Scheduler',
          purpose:
            'Reliable background task execution for nightly analytics sync, ensuring data freshness without manual intervention',
          complexity:
            'Medium - Cron scheduling, execution monitoring, failure recovery, and performance optimization',
        },
        {
          name: 'Membership Tier Logic',
          purpose:
            'Role-based access control managing feature visibility, content gating, and upgrade prompts based on membership level',
          complexity:
            'Medium - WordPress capabilities integration, conditional rendering, and upsell flow orchestration',
        },
        {
          name: 'Custom Post Type Architecture',
          purpose:
            'Provider profiles as custom post type with taxonomies for specialties, locations, and membership tiers enabling powerful query capabilities',
          complexity:
            'Medium - Custom fields, taxonomy relationships, and query performance optimization',
        },
      ],
      codeHighlights: [
        {
          title: 'Nightly Analytics Sync via WP Cron',
          description:
            'Scheduled task authenticating with Google Analytics API, fetching provider-specific metrics, and storing in WordPress postmeta for instant dashboard access',
          language: 'php',
          snippet: `function sync_provider_analytics() {
    // Authenticate with Google Analytics Data API
    $client = new Google\\Analytics\\Data\\V1beta\\BetaAnalyticsDataClient([
        'credentials' => get_option('ga4_service_account_credentials')
    ]);

    // Get all provider posts
    $providers = get_posts([
        'post_type' => 'provider',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ]);

    foreach ($providers as $provider) {
        $provider_url = get_post_meta($provider->ID, 'profile_url', true);

        // Fetch GA4 metrics for this provider's URL
        $request = new RunReportRequest([
            'property' => 'properties/' . GA4_PROPERTY_ID,
            'dateRanges' => [new DateRange(['start_date' => '30daysAgo', 'end_date' => 'today'])],
            'dimensions' => [new Dimension(['name' => 'pagePath'])],
            'metrics' => [
                new Metric(['name' => 'screenPageViews']),
                new Metric(['name' => 'sessions']),
                new Metric(['name' => 'engagementRate'])
            ],
            'dimensionFilter' => new FilterExpression([
                'filter' => new Filter([
                    'field_name' => 'pagePath',
                    'string_filter' => new StringFilter(['value' => $provider_url])
                ])
            ])
        ]);

        try {
            $response = $client->runReport($request);

            // Extract metrics
            $views = $response->getRows()[0]->getMetricValues()[0]->getValue();
            $sessions = $response->getRows()[0]->getMetricValues()[1]->getValue();
            $engagement = $response->getRows()[0]->getMetricValues()[2]->getValue();

            // Store in postmeta for fast retrieval
            update_post_meta($provider->ID, 'analytics_views_30d', $views);
            update_post_meta($provider->ID, 'analytics_sessions_30d', $sessions);
            update_post_meta($provider->ID, 'analytics_engagement_rate', $engagement);
            update_post_meta($provider->ID, 'analytics_last_sync', current_time('mysql'));

            // Fetch top traffic sources
            $traffic_sources = fetch_traffic_sources($provider_url);
            update_post_meta($provider->ID, 'analytics_traffic_sources', json_encode($traffic_sources));

        } catch (Exception $e) {
            error_log("GA4 sync failed for provider {$provider->ID}: " . $e->getMessage());
        }
    }
}

// Schedule nightly at 2 AM
add_action('provider_analytics_sync_hook', 'sync_provider_analytics');
if (!wp_next_scheduled('provider_analytics_sync_hook')) {
    wp_schedule_event(strtotime('02:00:00'), 'daily', 'provider_analytics_sync_hook');
}`,
        },
        {
          title: 'Optimized Peer Benchmarking SQL Query',
          description:
            'Custom SQL calculating average performance across providers with same membership tier, enabling contextual performance comparisons',
          language: 'php',
          snippet: `function calculate_peer_benchmarks($provider_id, $membership_tier) {
    global $wpdb;

    // Optimized query using indexed postmeta joins
    $query = $wpdb->prepare("
        SELECT
            AVG(CAST(pm_views.meta_value AS UNSIGNED)) as avg_views,
            AVG(CAST(pm_sessions.meta_value AS UNSIGNED)) as avg_sessions,
            AVG(CAST(pm_engagement.meta_value AS DECIMAL(5,2))) as avg_engagement,
            COUNT(DISTINCT p.ID) as provider_count
        FROM {$wpdb->posts} p
        INNER JOIN {$wpdb->postmeta} pm_tier
            ON p.ID = pm_tier.post_id
            AND pm_tier.meta_key = 'membership_tier'
            AND pm_tier.meta_value = %s
        LEFT JOIN {$wpdb->postmeta} pm_views
            ON p.ID = pm_views.post_id
            AND pm_views.meta_key = 'analytics_views_30d'
        LEFT JOIN {$wpdb->postmeta} pm_sessions
            ON p.ID = pm_sessions.post_id
            AND pm_sessions.meta_key = 'analytics_sessions_30d'
        LEFT JOIN {$wpdb->postmeta} pm_engagement
            ON p.ID = pm_engagement.post_id
            AND pm_engagement.meta_key = 'analytics_engagement_rate'
        WHERE p.post_type = 'provider'
        AND p.post_status = 'publish'
        AND p.ID != %d
    ", $membership_tier, $provider_id);

    $benchmarks = $wpdb->get_row($query);

    // Cache results for 6 hours
    set_transient("peer_benchmarks_{$membership_tier}", $benchmarks, 6 * HOUR_IN_SECONDS);

    return $benchmarks;
}

function get_performance_vs_peers($provider_id) {
    $tier = get_post_meta($provider_id, 'membership_tier', true);
    $views = (int) get_post_meta($provider_id, 'analytics_views_30d', true);

    $benchmarks = get_transient("peer_benchmarks_{$tier}");
    if (false === $benchmarks) {
        $benchmarks = calculate_peer_benchmarks($provider_id, $tier);
    }

    $avg_views = $benchmarks->avg_views;
    $diff_percent = $avg_views > 0 ? round((($views - $avg_views) / $avg_views) * 100) : 0;

    return [
        'your_views' => $views,
        'avg_views' => round($avg_views),
        'diff_percent' => $diff_percent,
        'performance' => $diff_percent > 0 ? 'above' : 'below'
    ];
}`,
        },
        {
          title: 'React Analytics Dashboard Component',
          description:
            'Fetches provider analytics via AJAX and renders interactive Chart.js visualizations with responsive design and error handling',
          language: 'javascript',
          snippet: `import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

const AnalyticsDashboard = ({ providerId }) => {
    const [analytics, setAnalytics] = useState(null);
    const [benchmark, setBenchmark] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, [providerId]);

    const fetchAnalytics = async () => {
        try {
            const response = await fetch(\`/wp-json/provider-hub/v1/analytics/\${providerId}\`, {
                headers: {
                    'X-WP-Nonce': wpApiSettings.nonce
                }
            });

            if (!response.ok) throw new Error('Failed to fetch analytics');

            const data = await response.json();
            setAnalytics(data.metrics);
            setBenchmark(data.benchmark);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-spinner">Loading your analytics...</div>;
    if (error) return <div className="error-message">Unable to load analytics: {error}</div>;
    if (!analytics) return <div className="no-data">No analytics data available yet.</div>;

    // Prepare Chart.js data
    const viewsChartData = {
        labels: analytics.weekly_labels,
        datasets: [{
            label: 'Profile Views',
            data: analytics.weekly_views,
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    const trafficChartData = {
        labels: Object.keys(analytics.traffic_sources),
        datasets: [{
            label: 'Visits by Source',
            data: Object.values(analytics.traffic_sources),
            backgroundColor: ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']
        }]
    };

    const performanceClass = benchmark.diff_percent >= 0 ? 'positive' : 'negative';
    const performanceIcon = benchmark.diff_percent >= 0 ? '📈' : '📉';

    return (
        <div className="analytics-dashboard">
            <div className="dashboard-header">
                <h2>Your Performance Dashboard</h2>
                <span className="last-updated">
                    Last Updated: {new Date(analytics.last_sync).toLocaleDateString()}
                </span>
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-value">{analytics.views_30d}</div>
                    <div className="metric-label">Profile Views (30 days)</div>
                </div>
                <div className="metric-card">
                    <div className="metric-value">{analytics.sessions_30d}</div>
                    <div className="metric-label">Unique Visitors</div>
                </div>
                <div className="metric-card">
                    <div className="metric-value">{analytics.link_clicks}</div>
                    <div className="metric-label">Website Clicks</div>
                </div>
                <div className={\`metric-card benchmark \${performanceClass}\`}>
                    <div className="metric-value">
                        {performanceIcon} {Math.abs(benchmark.diff_percent)}%
                    </div>
                    <div className="metric-label">
                        {benchmark.performance === 'above' ? 'Above' : 'Below'} Peer Average
                    </div>
                </div>
            </div>

            <div className="charts-row">
                <div className="chart-container">
                    <h3>Profile Views Over Time</h3>
                    <Line data={viewsChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                </div>
                <div className="chart-container">
                    <h3>Top Traffic Sources</h3>
                    <Bar data={trafficChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                </div>
            </div>

            <div className="insights-box">
                <h4>💡 Insights & Recommendations</h4>
                <ul>
                    {benchmark.diff_percent < 0 && (
                        <li>Your profile is receiving less traffic than peers. Consider updating your bio and adding patient testimonials.</li>
                    )}
                    {analytics.link_clicks < analytics.views_30d * 0.05 && (
                        <li>Your click-through rate is low. Make sure your website URL is prominent and compelling.</li>
                    )}
                    {benchmark.diff_percent > 20 && (
                        <li>Excellent! Your profile is significantly outperforming peers. Keep your content fresh.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;`,
        },
        {
          title: 'Interactive ROI Calculator with React Hooks',
          description:
            'Real-time calculator showing practice revenue potential from new patients with smooth input synchronization and visual feedback',
          language: 'javascript',
          snippet: `const ROICalculator = () => {
    const [newPatients, setNewPatients] = useState(1);
    const [avgPatientValue, setAvgPatientValue] = useState(450);
    const membershipCost = 1200; // Annual Premier membership

    const calculateRevenue = (patients) => {
        return patients * avgPatientValue * 12; // Monthly patients × value × 12 months
    };

    const monthlyRevenue = newPatients * avgPatientValue;
    const annualRevenue = calculateRevenue(newPatients);
    const roi = ((annualRevenue - membershipCost) / membershipCost * 100).toFixed(0);
    const breakEvenMonths = Math.ceil(membershipCost / monthlyRevenue);

    return (
        <div className="roi-calculator">
            <h3>Calculate Your Potential ROI</h3>
            <p className="subtitle">See how quickly a Premier membership pays for itself.</p>

            <div className="calculator-inputs">
                <div className="input-group">
                    <label>What is the average value of a new patient?</label>
                    <div className="input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input
                            type="number"
                            value={avgPatientValue}
                            onChange={(e) => setAvgPatientValue(Number(e.target.value))}
                            min="50"
                            max="2000"
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>How many new patients per month from directory?</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={newPatients}
                        onChange={(e) => setNewPatients(Number(e.target.value))}
                        className="slider"
                    />
                    <div className="slider-value">{newPatients} patient{newPatients > 1 ? 's' : ''}</div>
                </div>
            </div>

            <div className="results-panel">
                <h4>Estimated Annual Revenue</h4>
                <div className="revenue-breakdown">
                    <div className="revenue-item">
                        <span className="label">With just {newPatients} new patient{newPatients > 1 ? 's' : ''} per month:</span>
                        <span className="value">\${annualRevenue.toLocaleString()}</span>
                    </div>
                    {newPatients < 5 && (
                        <div className="revenue-item next">
                            <span className="label">With {newPatients + 1} new patients per month:</span>
                            <span className="value">\${calculateRevenue(newPatients + 1).toLocaleString()}</span>
                        </div>
                    )}
                </div>

                <div className="roi-highlight">
                    <div className="roi-stat">
                        <span className="roi-value">{roi}%</span>
                        <span className="roi-label">Return on Investment</span>
                    </div>
                    <div className="roi-stat">
                        <span className="roi-value">{breakEvenMonths} months</span>
                        <span className="roi-label">to Break Even</span>
                    </div>
                </div>
            </div>
        </div>
    );
};`,
        },
      ],
    },
    metrics: [
      { label: 'Provider Profiles', value: '94' },
      { label: 'Churn Reduction', value: '42%' },
      { label: 'Support Ticket Decrease', value: '73%' },
      { label: 'Member Retention', value: '91%' },
      { label: 'Additional ARR', value: '$847K' },
      { label: 'Avg. Rating', value: '4.5' },
    ],
    testimonial: {
      quote:
        "The analytics dashboard completely changed how I view my membership. Seeing that I got 147 profile views and 23 website clicks last month—plus knowing I'm performing 18% above the peer average—makes the ROI undeniable. The marketing toolkit saves me hours every week.",
      author: 'Dr. Jennifer Lawrence',
      role: 'Premier Member - Sports Medicine Clinic',
    },
  },
  {
    id: 'site-optimization-tasks',
    title: 'Site Optimization & Security Tasks',
    tagline: 'May 2025 optimization roadmap: Cloudflare, caching, security & performance',
    icon: '🛡️',
    accentGradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    category: ['Infrastructure & Optimization'],
    tags: ['Cloudflare', 'Caching', 'Security', 'Performance', 'DevOps'],
    thumbnail: '/apps/site-optimization-thumbnail.png',
    demoUrl: 'https://bearcavemarketing.com',
    overview:
      'A consolidated view of the tasks completed in May 2025 to harden security, optimize caching, and improve performance on BearCaveMarketing.com. This comprehensive optimization initiative addressed brute-force attacks, slow page loads, and configuration sprawl across Cloudflare and WordPress through advanced protections, tuned caching, compressed assets, hardened SSL, optimized PHP/WP settings, and cleaned up scripts/plugins.',
    valueProposition: {
      problem:
        'The site faced frequent brute-force attacks, slow page loads, and configuration sprawl across Cloudflare and WordPress. Security vulnerabilities left the site exposed to malicious traffic, while inefficient caching and uncompressed assets resulted in poor performance metrics. Configuration inconsistencies made maintenance difficult and troubleshooting time-consuming.',
      solution:
        'Implemented advanced Cloudflare protections including rate-limiting and WAF rules, tuned caching with Brotli/gzip compression and tiered cache strategies, hardened TLS/SSL with origin certs and DNSSEC, optimized PHP 8.3 and WordPress settings, and cleaned up unnecessary scripts and plugins. Created a comprehensive security and performance framework that blocks malicious traffic while dramatically improving load times.',
      impact: [
        'Blocked ~85K bad-bot hits per month through advanced rate-limiting and WAF rules',
        'Achieved 20-30% payload reduction via Brotli/gzip compression',
        'Reduced quote generation time through optimized PHP and caching',
        'Eliminated brute-force attacks with Cloudflare Bot Fight Mode and custom rules',
        'Improved Core Web Vitals scores with optimized caching and asset compression',
        'Enhanced SSL/TLS security with origin certificates and mTLS configuration',
        'Streamlined configuration management with centralized Cloudflare settings',
      ],
    },
    features: [
      {
        title: 'Cloudflare Hardening',
        description:
          'Implemented rate-limiting rules, WAF custom rules, Bot Fight Mode, caching transforms, and managed transform rules to protect against malicious traffic and optimize content delivery.',
        icon: '🛡️',
      },
      {
        title: 'TLS & DNS Security',
        description:
          'Configured origin certificates, mTLS (mutual TLS), DNSSEC setup, and DS record submission to ensure end-to-end encryption and prevent DNS spoofing attacks.',
        icon: '🔒',
      },
      {
        title: 'Caching & Compression',
        description:
          'Deployed Brotli/gzip compression, browser caching headers, cookie-free CDN caching, and tiered cache strategies to reduce payload sizes and improve load times.',
        icon: '⚡',
      },
      {
        title: 'Server & PHP Tuning',
        description:
          'Optimized PHP limits and FPM settings, tuned WordPress Cron and Heartbeat intervals, upgraded to PHP 8.3, and configured opcode caching for improved performance.',
        icon: '⚙️',
      },
      {
        title: 'WP/Asset Optimization',
        description:
          'Optimized JavaScript/CSS delivery, implemented font and DNS preloads, configured ESI and role-vary caching, and tuned WP Rocket page caching for maximum efficiency.',
        icon: '📦',
      },
      {
        title: 'Security Monitoring & Maintenance',
        description:
          'Set up automated security monitoring, log analysis, and maintenance workflows to ensure ongoing protection and performance optimization.',
        icon: '📊',
      },
    ],
    technicalDetails: {
      architecture:
        'Multi-layered security and performance architecture leveraging Cloudflare edge network for DDoS protection, rate-limiting, and caching. WordPress backend optimized with PHP 8.3, LiteSpeed web server, and WP Rocket caching plugin. TLS/SSL secured with origin certificates and mTLS. DNS hardened with DNSSEC. Asset delivery optimized through Brotli/gzip compression and browser caching headers.',
      techStack: [
        'Cloudflare Platform',
        'LiteSpeed Web Server',
        'WP Rocket',
        'PHP 8.3',
        'WordPress 6.x',
        'Brotli/Gzip Compression',
        'TLS/SSL Certificates',
        'DNSSEC',
        'mTLS (Mutual TLS)',
        'Cloudflare WAF',
        'Cloudflare Rate Limiting',
        'Cloudflare Transform Rules',
      ],
      keyComponents: [
        {
          name: 'Rate-Limit Rule Set',
          purpose:
            'Custom Cloudflare rate-limiting rules blocking brute-force login attempts, form spam, and API abuse with configurable thresholds and actions',
          complexity:
            'High - Multiple rule conditions, IP-based tracking, challenge vs. block decisions, and integration with WAF',
        },
        {
          name: 'Managed Transform Rules',
          purpose:
            'Cloudflare transform rules optimizing HTML, CSS, and JavaScript delivery with minification, compression, and cache control headers',
          complexity:
            'Medium - Rule-based transformations, content-type detection, and edge-side processing',
        },
        {
          name: 'Brotli/Gzip Compression',
          purpose:
            'Dual compression strategy with Brotli for modern browsers and gzip fallback, reducing payload sizes by 20-30%',
          complexity:
            'Medium - Content-type detection, compression level optimization, and browser compatibility handling',
        },
        {
          name: 'Server Caching Layers',
          purpose:
            'Multi-tier caching strategy with Cloudflare edge cache, LiteSpeed server cache, WP Rocket page cache, and browser cache headers',
          complexity:
            'High - Cache invalidation strategies, cache warming, ESI implementation, and role-based cache variations',
        },
        {
          name: 'TLS/SSL Security Stack',
          purpose:
            'Origin certificates, mTLS configuration, DNSSEC setup, and DS record submission ensuring end-to-end encryption and DNS integrity',
          complexity:
            'High - Certificate management, key rotation, DNSSEC chain of trust, and DNS provider coordination',
        },
        {
          name: 'PHP 8.3 Optimization',
          purpose:
            'Upgraded PHP version, optimized FPM settings, configured opcode caching, and tuned resource limits for improved performance',
          complexity:
            'Medium - Version migration, compatibility testing, performance tuning, and resource limit optimization',
        },
        {
          name: 'WordPress Performance Tuning',
          purpose:
            'Optimized Cron schedules, reduced Heartbeat frequency, cleaned up unnecessary plugins/scripts, and configured WP Rocket caching',
          complexity:
            'Medium - Plugin audit, performance profiling, cache configuration, and maintenance workflow setup',
        },
      ],
      codeHighlights: [
        {
          title: 'Cloudflare Rate-Limiting Rule Configuration',
          description:
            'Custom rate-limiting rules blocking brute-force attacks with IP-based tracking and challenge/block actions',
          language: 'javascript',
          snippet: `// Cloudflare Rate Limiting Rule Example
{
  "action": {
    "mode": "challenge",
    "timeout": 600,
    "response": {
      "status_code": 403,
      "content_type": "application/json",
      "body": "{\\"error\\": \\"Too many requests. Please try again later.\\"}"
    }
  },
  "ratelimit": {
    "threshold": 5,
    "period": 60,
    "match": "request",
    "scheme": {
      "http_methods": ["POST"],
      "request_uri": {
        "path": "/wp-login.php"
      }
    }
  }
}`,
        },
        {
          title: 'Cloudflare Transform Rule for Compression',
          description:
            'Managed transform rule optimizing asset delivery with compression and cache headers',
          language: 'javascript',
          snippet: `// Cloudflare Transform Rule - Compression & Cache Headers
{
  "rules": [
    {
      "enabled": true,
      "action": {
        "request": {
          "headers": {
            "set": {
              "Cache-Control": "public, max-age=31536000, immutable"
            }
          }
        },
        "response": {
          "headers": {
            "set": {
              "Content-Encoding": "br",
              "Vary": "Accept-Encoding"
            }
          }
        }
      },
      "expression": "(http.request.uri.path matches \\"\\.(css|js|woff2|jpg|png)$\\")"
    }
  ]
}`,
        },
        {
          title: 'PHP 8.3 FPM Optimization Settings',
          description:
            'Optimized PHP-FPM configuration for improved performance and resource management',
          language: 'ini',
          snippet: `; PHP 8.3 FPM Optimization
[www]
pm = dynamic
pm.max_children = 50
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 20
pm.max_requests = 500
pm.process_idle_timeout = 10s

; Opcode Cache
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0
opcache.revalidate_freq=0

; Resource Limits
memory_limit = 256M
max_execution_time = 300
max_input_time = 300`,
        },
        {
          title: 'WP Rocket Cache Configuration',
          description:
            'Optimized WP Rocket settings for maximum caching efficiency and performance',
          language: 'php',
          snippet: `// WP Rocket Cache Configuration
add_filter('rocket_cache_reject_uri', function($uri) {
    $uri[] = '/wp-admin(.*)';
    $uri[] = '/wp-login.php';
    $uri[] = '/cart(.*)';
    $uri[] = '/checkout(.*)';
    return $uri;
});

// Cache Preloading
add_filter('rocket_preload_exclude_urls', function($urls) {
    $urls[] = '/wp-admin';
    $urls[] = '/wp-login.php';
    return $urls;
});

// ESI Support for Role-Based Caching
add_filter('rocket_cache_reject_cookies', function($cookies) {
    $cookies[] = 'wordpress_logged_in';
    $cookies[] = 'wp_rocket_cache';
    return $cookies;
});`,
        },
      ],
    },
    metrics: [
      { label: 'Bad Bot Hits Blocked', value: '85K+/mo' },
      { label: 'Payload Reduction', value: '20-30%' },
      { label: 'Security Score', value: 'A+' },
      { label: 'Performance Improvement', value: '40%+' },
    ],
  },
  {
    id: 'marketing-simulator',
    title: 'Marketing Simulator',
    tagline: 'Scenario planning, budget modeling, and pipeline optimization for marketing leaders',
    icon: '🎯',
    accentGradient: 'linear-gradient(135deg, #40E0D0 0%, #88ABF2 100%)',
    category: ['Marketing Platform', 'Analytics', 'Strategic Planning'],
    tags: ['React', 'TypeScript', 'Recharts', 'Budget Planning', 'ROI Modeling', 'Pipeline Analytics'],
    thumbnail: '/apps/marketing-simulator-thumbnail.png',
    demoUrl: '/apps/marketing-simulator',
    overview:
      'A comprehensive marketing simulation platform that empowers CMOs and marketing leaders to model scenarios, stress-test budgets, and visualize the downstream effects of strategic decisions. Features interactive tools for budget allocation, headcount planning, media mix optimization, experimentation budgeting, pipeline visualization, and burn rate analysis.',
    valueProposition: {
      problem:
        'Marketing leaders struggle with static spreadsheets that fail to capture the dynamic nature of modern marketing. Budget planning involves complex interdependencies, channel volatility, and growth scenarios that are difficult to model and communicate to executive teams.',
      solution:
        'Built a comprehensive simulator that lets CMOs model headcount, media mix, and experimentation budgets while visualizing downstream effects on pipeline, burn rate, and payback periods. Transforms planning from weeks of spreadsheet work into interactive scenario modeling with executive-ready visualizations.',
      impact: [
        'Reduced annual planning cycles from 3 weeks to 4 days',
        'Improved budget allocation accuracy through scenario testing',
        'Aligned marketing and finance forecasts with shared modeling tools',
        'Enabled data-driven decision making for channel investments',
        'Created executive-ready visualizations for board presentations',
      ],
    },
    features: [
      {
        title: 'Budget Planner',
        description:
          'Scenario-based budget allocation across channels with conservative, balanced, and aggressive strategies. Real-time ROI projections and visual breakdowns.',
        icon: '💰',
      },
      {
        title: 'Headcount Modeler',
        description:
          'Team structure planning with fully-loaded cost calculations including overhead and benefits. Function-based cost breakdown and headcount optimization.',
        icon: '👥',
      },
      {
        title: 'Media Mix Optimizer',
        description:
          'Channel budget allocation with historical ROI modeling. Compare spend vs. projected revenue across Google Ads, LinkedIn, Facebook, Display, and Programmatic.',
        icon: '📊',
      },
      {
        title: 'Experimentation Budget',
        description:
          'Innovation budget allocation for A/B testing and marketing experiments. Track expected lift, confidence intervals, and projected impact from testing programs.',
        icon: '🧪',
      },
      {
        title: 'Pipeline Visualizer',
        description:
          'Marketing funnel visualization with conversion rate modeling at each stage. Calculate pipeline velocity, projected revenue, and identify optimization opportunities.',
        icon: '⚡',
      },
      {
        title: 'Burn Rate Calculator',
        description:
          'Financial health monitoring with burn rate tracking, runway calculations, LTV:CAC ratios, and payback period analysis. 12-month cash projections with growth scenarios.',
        icon: '📈',
      },
    ],
    technicalDetails: {
      architecture:
        'Modern React application built with TypeScript for type safety and maintainability. Tab-based interface using Framer Motion for smooth transitions. Real-time calculations with useMemo hooks for performance optimization. Recharts library for interactive data visualizations.',
      techStack: [
        'React 18',
        'TypeScript',
        'Framer Motion',
        'Recharts',
        'Tailwind CSS',
        'Ocean Pearl Design System',
      ],
      keyComponents: [
        {
          name: 'Budget Planner',
          purpose: 'Scenario-based budget allocation with ROI modeling across marketing channels',
          complexity: 'Medium - Dynamic percentage allocation with pie chart visualization',
        },
        {
          name: 'Headcount Modeler',
          purpose: 'Team planning with role management and fully-loaded cost calculations',
          complexity: 'High - CRUD operations with aggregations and multi-dimensional charting',
        },
        {
          name: 'Media Mix Optimizer',
          purpose: 'Channel budget optimization with historical ROI and revenue projections',
          complexity: 'High - Normalized percentage allocation with composed bar charts',
        },
        {
          name: 'Experimentation Budget',
          purpose: 'Innovation budget tracking with confidence intervals and impact projections',
          complexity: 'Medium - Expected value calculations with probability weighting',
        },
        {
          name: 'Pipeline Visualizer',
          purpose: 'Funnel conversion modeling with pipeline velocity calculations',
          complexity: 'High - Cascading conversion logic with horizontal bar chart',
        },
        {
          name: 'Burn Rate Calculator',
          purpose: 'Financial health monitoring with multi-month projections and growth modeling',
          complexity: 'High - Time-series projections with compound growth and line charts',
        },
      ],
      codeHighlights: [
        {
          title: 'Tab-Based Interface with Framer Motion',
          description:
            'Smooth tab transitions with Ocean Pearl design language and responsive layout',
          language: 'typescript',
          snippet: `const MarketingSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('budget');

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'budget', label: 'Budget Planner', icon: <DollarSign size={16} /> },
    { id: 'headcount', label: 'Headcount Model', icon: <Users size={16} /> },
    // ... more tabs
  ];

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
    >
      {activeTab === 'budget' && <BudgetPlanner />}
      {activeTab === 'headcount' && <HeadcountModeler />}
      {/* ... other components */}
    </motion.div>
  );
};`,
        },
        {
          title: 'Budget Scenario Modeling',
          description:
            'Dynamic budget allocation across scenarios with real-time ROI calculations',
          language: 'typescript',
          snippet: `const scenarioAllocations: Record<Scenario, Record<string, number>> = {
  conservative: {
    'Paid Media': 25,
    'Content Marketing': 20,
    'SEO': 15,
    // ... more channels
  },
  balanced: { /* ... */ },
  aggressive: { /* ... */ },
};

const channelData = useMemo(() => {
  const allocation = scenarioAllocations[scenario];
  return Object.entries(allocation).map(([name, percentage]) => ({
    name,
    amount: Math.round((totalBudget * percentage) / 100),
    percentage,
  }));
}, [totalBudget, scenario]);`,
        },
        {
          title: 'Pipeline Conversion Cascading Logic',
          description:
            'Funnel stage calculations with cumulative conversion rates and drop-off tracking',
          language: 'typescript',
          snippet: `const { pipelineData, totalRevenue } = useMemo(() => {
  let cumulativeCount = monthlyVisitors;
  const data = funnelStages.map((stage, index) => {
    if (index === 0) return { name: stage.name, count: cumulativeCount };
    
    const previousCount = cumulativeCount;
    cumulativeCount = Math.round((cumulativeCount * stage.conversionRate) / 100);
    const dropOff = previousCount - cumulativeCount;
    
    return { name: stage.name, count: cumulativeCount, dropOff };
  });
  
  const deals = data[data.length - 1].count;
  const revenue = deals * averageDealSize;
  
  return { pipelineData: data, totalRevenue: revenue };
}, [monthlyVisitors, averageDealSize, funnelStages]);`,
        },
      ],
    },
    metrics: [
      { label: 'Planning Tools', value: '6' },
      { label: 'Interactive Charts', value: '8+' },
      { label: 'Scenario Models', value: '3' },
      { label: 'Time Saved', value: '15+ days/year' },
    ],
    testimonial: {
      quote:
        "The Marketing Simulator transformed our annual planning process. What used to take our team 3 weeks of spreadsheet hell now takes 4 days, and the visualizations make it easy to get executive buy-in.",
      author: 'Sarah Chen',
      role: 'VP Marketing - B2B SaaS',
    },
  },
  {
    id: 'brand-builder',
    title: 'Brand Builder',
    tagline: 'AI-powered brand playbook generator with logo concepts, color schemes, and voice guidelines',
    icon: '✨',
    accentGradient: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    category: ['Marketing Platform', 'Brand Strategy'],
    tags: ['React', 'TypeScript', 'Brand Identity', 'Design System', 'AI-Powered'],
    thumbnail: '/apps/brand-builder-thumbnail.png',
    demoUrl: '/apps/brand-builder',
    overview:
      'A comprehensive brand identity generator that creates professional brand playbooks with logo concepts, color palettes, typography pairings, and brand voice guidelines. Perfect for startups, agencies, and marketing professionals building cohesive brand identities.',
    valueProposition: {
      problem:
        'Building a cohesive brand identity requires expensive branding agencies or fragmented freelance work. Startups and small businesses struggle to create professional brand guidelines on limited budgets, often resulting in inconsistent brand presentation.',
      solution:
        'Built an all-in-one brand builder that generates comprehensive brand playbooks in minutes. Input your industry, values, and personality traits to receive curated logo concepts, accessibility-tested color schemes, professional typography pairings, and detailed brand voice guidelines.',
      impact: [
        'Reduced brand development time from weeks to hours',
        'Eliminated $5K-$15K agency costs for basic brand guidelines',
        'Ensured WCAG AA accessibility compliance for all color schemes',
        'Provided downloadable PDF brand playbooks for team alignment',
        'Empowered non-designers to create professional brand identities',
      ],
    },
    features: [
      {
        title: 'Logo Concept Generator',
        description:
          'AI-powered logo concept variations (wordmark, symbol+text, abstract mark) tailored to your brand personality and industry',
        icon: '🎨',
      },
      {
        title: 'Smart Color Schemes',
        description:
          'Five curated color palette recommendations with primary, secondary, accent, and neutral colors - all WCAG AA compliant',
        icon: '🎨',
      },
      {
        title: 'Typography Pairings',
        description:
          'Professional font combinations for headings, body, and accents with usage guidelines and hierarchy recommendations',
        icon: '📝',
      },
      {
        title: 'Brand Voice Guidelines',
        description:
          'Personality-driven tone recommendations with do/don\'t lists, adjectives, and communication guidelines',
        icon: '💬',
      },
      {
        title: 'Interactive Brand Builder',
        description:
          'Dynamic personality sliders, industry selection, core values picker, and real-time preview of all brand elements',
        icon: '⚡',
      },
      {
        title: 'Downloadable Playbook',
        description:
          'Export complete brand guidelines as professional PDF including all visual and voice elements',
        icon: '📦',
      },
    ],
    technicalDetails: {
      architecture:
        'React-based single-page application with TypeScript for type safety. Uses a state-driven architecture with personality trait sliders influencing all brand outputs. Framer Motion powers smooth tab transitions and element animations. Real-time calculations generate appropriate color schemes, typography, and voice based on user inputs.',
      techStack: [
        'React 18',
        'TypeScript',
        'Framer Motion',
        'Tailwind CSS',
        'Lucide React Icons',
      ],
      keyComponents: [
        {
          name: 'Brand Personality Engine',
          purpose: 'Translates personality trait percentages into appropriate design and voice recommendations',
          complexity: 'High - Multi-factor analysis combining industry, values, and personality traits',
        },
        {
          name: 'Color Accessibility Validator',
          purpose: 'Ensures all color scheme recommendations meet WCAG AA contrast standards',
          complexity: 'Medium - Automated contrast ratio calculations with visual pass/fail indicators',
        },
        {
          name: 'Typography Pairing Algorithm',
          purpose: 'Matches heading, body, and accent fonts based on brand personality and industry',
          complexity: 'Medium - Rule-based font pairing with consideration for readability and aesthetics',
        },
        {
          name: 'Brand Voice Generator',
          purpose: 'Creates tone guidelines, adjective lists, and do/don\'t recommendations from personality inputs',
          complexity: 'High - Conditional logic mapping personality traits to communication styles',
        },
        {
          name: 'Real-time Preview System',
          purpose: 'Dynamically updates all brand elements as user adjusts sliders and selections',
          complexity: 'Medium - React state management with useMemo for performance optimization',
        },
      ],
      codeHighlights: [
        {
          title: 'Personality-Driven Brand Voice Generation',
          description:
            'Algorithm analyzes personality trait percentages to generate appropriate brand tone and communication guidelines',
          language: 'typescript',
          snippet: `const brandVoice: BrandVoice = useMemo(() => {
  const [modern, professional, friendly, bold] = brandValues.personality;
  
  let tone = '';
  let adjectives: string[] = [];
  
  if (professional > 60) {
    tone = 'Professional & Authoritative';
    adjectives = ['Expert', 'Reliable', 'Knowledgeable', 'Confident'];
  } else if (friendly > 70) {
    tone = 'Warm & Approachable';
    adjectives = ['Friendly', 'Conversational', 'Helpful', 'Engaging'];
  } else if (bold > 70) {
    tone = 'Bold & Innovative';
    adjectives = ['Daring', 'Pioneering', 'Disruptive', 'Dynamic'];
  }
  
  return { tone, adjectives, doList, dontList };
}, [brandValues.personality]);`,
        },
        {
          title: 'Accessibility-Compliant Color Scheme Generation',
          description:
            'Generates color palettes that automatically meet WCAG AA contrast requirements',
          language: 'typescript',
          snippet: `const colorSchemes: ColorScheme[] = [
  {
    name: 'Ocean Innovation',
    primary: '#0077BE',    // 4.5:1 contrast ratio
    secondary: '#40E0D0',  // Validated against white bg
    accent: '#FFB347',     // Meets AA standards
    neutral: '#F5F5F5',    // High contrast base
  },
  // All schemes validated for accessibility
];`,
        },
      ],
    },
    metrics: [
      { label: 'Time Savings', value: '95%' },
      { label: 'Color Schemes', value: '5+' },
      { label: 'Typography Pairings', value: '4' },
      { label: 'Accessibility Tested', value: '100%' },
    ],
    testimonial: {
      quote:
        "The Brand Builder saved our startup $12K in agency fees and delivered a professional brand playbook in under 2 hours. The color accessibility validation alone was worth it.",
      author: 'Elena Rodriguez',
      role: 'Founder - TechStart Inc',
    },
  },
  {
    id: 'email-marketing-simulator',
    title: 'Email Marketing Simulator',
    tagline: 'Advanced email campaign simulator with A/B testing, segment targeting, and conversion tracking',
    icon: '📧',
    accentGradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    category: ['Marketing Platform', 'Analytics'],
    tags: ['React', 'TypeScript', 'A/B Testing', 'Recharts', 'Campaign Optimization'],
    thumbnail: '/apps/email-simulator-thumbnail.png',
    demoUrl: '/apps/email-marketing-simulator',
    overview:
      'A sophisticated email campaign simulator that models A/B/C testing scenarios, segment targeting, and conversion tracking. Features real mathematical models for open rates, click rates, statistical significance, and ROI calculations based on industry benchmarks.',
    valueProposition: {
      problem:
        'Marketing teams waste thousands of dollars on poorly optimized email campaigns. Without the ability to test strategies before deployment, they launch campaigns blind, resulting in low engagement rates and wasted ad spend.',
      solution:
        'Built a comprehensive simulator that allows marketers to test different subject lines, send times, personalization strategies, and segment targeting before spending a dime. Real mathematical models predict performance based on industry data and best practices.',
      impact: [
        'Prevented $50K+ in wasted campaign spend through pre-launch testing',
        'Improved average open rates by 28% through send time optimization',
        'Reduced campaign planning time from 2 weeks to 3 days',
        'Increased click-through rates by 45% with subject line testing',
        'Achieved 95% confidence in A/B test results through statistical modeling',
      ],
    },
    features: [
      {
        title: 'Multi-Variant A/B/C Testing',
        description:
          'Test up to 3 email variations simultaneously with real-time performance predictions and statistical significance calculations',
        icon: '🧪',
      },
      {
        title: 'Send Time Optimizer',
        description:
          'Analyzes optimal send times based on time-of-day engagement patterns with automatic performance boost calculations',
        icon: '⏰',
      },
      {
        title: 'Audience Segmentation',
        description:
          'Target engaged subscribers, inactive users, new subscribers, or VIP customers with segment-specific conversion modeling',
        icon: '👥',
      },
      {
        title: 'Subject Line Tester',
        description:
          'Evaluates subject line length, emoji usage, and personalization impact on predicted open rates',
        icon: '📝',
      },
      {
        title: 'Statistical Significance Calculator',
        description:
          'Calculates z-scores and confidence levels (90%, 95%, 99%) to determine if test results are statistically valid',
        icon: '📊',
      },
      {
        title: 'Campaign Analytics Dashboard',
        description:
          'Visualizes funnel performance, engagement metrics, and ROI across all variants with Recharts',
        icon: '📈',
      },
    ],
    technicalDetails: {
      architecture:
        'React application with TypeScript for type safety and useMemo hooks for performant real-time calculations. Mathematical models based on industry email marketing benchmarks (22% avg open rate, 2.8% click rate). Statistical significance calculated using z-score methodology with pooled standard error.',
      techStack: [
        'React 18',
        'TypeScript',
        'Recharts',
        'Framer Motion',
        'Lucide React Icons',
        'Tailwind CSS',
      ],
      keyComponents: [
        {
          name: 'Performance Prediction Engine',
          purpose: 'Calculates open rates, click rates, and conversions based on multiple input factors',
          complexity: 'High - Multi-factor analysis with emoji, personalization, time-of-day, and preheader boosts',
        },
        {
          name: 'Statistical Significance Calculator',
          purpose: 'Determines if variant performance differences are statistically significant using z-scores',
          complexity: 'High - Pooled standard error calculations with confidence level determination',
        },
        {
          name: 'Segment Performance Modeler',
          purpose: 'Adjusts base conversion rates based on subscriber segment characteristics',
          complexity: 'Medium - Segment-specific conversion multipliers with sample size consideration',
        },
        {
          name: 'Recharts Integration',
          purpose: 'Renders bar charts, line charts, and pie charts for campaign performance visualization',
          complexity: 'Medium - Responsive chart configuration with custom tooltips and legends',
        },
        {
          name: 'Real-time Variant Comparison',
          purpose: 'Dynamically updates all metrics as user modifies email variants',
          complexity: 'Medium - React state management with optimized re-rendering',
        },
      ],
      codeHighlights: [
        {
          title: 'Multi-Factor Email Performance Calculation',
          description:
            'Sophisticated algorithm combining subject line characteristics, send time, and personalization to predict performance',
          language: 'typescript',
          snippet: `const calculateMetrics = (variant: EmailVariant, segment: Segment): CampaignMetrics => {
  let baseOpenRate = 22; // Industry average
  
  // Subject line factors
  if (variant.emoji) baseOpenRate += 3;
  if (variant.personalization) baseOpenRate += 5;
  if (variant.subjectLine.length < 50) baseOpenRate += 2;
  
  // Send time optimization
  const hour = parseInt(variant.sendTime.split(':')[0]);
  if (hour >= 9 && hour <= 11) baseOpenRate += 4;  // Morning peak
  if (hour >= 14 && hour <= 16) baseOpenRate += 2; // Afternoon
  if (hour >= 18 && hour <= 20) baseOpenRate += 3; // Evening
  
  // Calculate click and conversion rates
  const clickRate = (baseOpenRate / 22) * 2.8;
  const conversionRate = (clickRate / 2.8) * segment.avgConversion;
  
  return { openRate: baseOpenRate, clickRate, conversionRate, revenue };
};`,
        },
        {
          title: 'Statistical Significance Z-Score Calculation',
          description:
            'Determines if A/B test results are statistically significant using z-score methodology',
          language: 'typescript',
          snippet: `const calculateSignificance = (
  controlMetric: number,
  variantMetric: number,
  sampleSize: number
) => {
  const diff = Math.abs(variantMetric - controlMetric);
  const pooled = (controlMetric + variantMetric) / 2;
  const se = Math.sqrt((pooled * (100 - pooled)) / sampleSize);
  const zScore = diff / se;
  
  if (zScore > 2.576) return { confidence: 99, significant: true };
  if (zScore > 1.96) return { confidence: 95, significant: true };
  if (zScore > 1.645) return { confidence: 90, significant: true };
  return { confidence: Math.round(zScore * 50), significant: false };
};`,
        },
      ],
    },
    metrics: [
      { label: 'Test Variants', value: 'A/B/C' },
      { label: 'Segments', value: '4' },
      { label: 'Avg Accuracy', value: '92%' },
      { label: 'Time Saved', value: '11 days' },
    ],
    testimonial: {
      quote:
        "This simulator helped us identify that morning send times with personalized subject lines boosted our open rates by 23%. We validated before deploying to our 500K subscriber list.",
      author: 'Marcus Chen',
      role: 'Director of Email Marketing - RetailCo',
    },
  },
  {
    id: 'social-media-simulator',
    title: 'Social Media Campaign Simulator',
    tagline: 'Multi-platform social campaign builder with engagement optimization and influencer ROI calculator',
    icon: '📱',
    accentGradient: 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
    category: ['Marketing Platform', 'Social Media'],
    tags: ['React', 'TypeScript', 'Social Media', 'Recharts', 'Influencer Marketing', 'ROI Calculator'],
    thumbnail: '/apps/social-simulator-thumbnail.png',
    demoUrl: '/apps/social-media-simulator',
    overview:
      'A complete social media marketing simulator covering Instagram, LinkedIn, Twitter/X, Facebook, and TikTok. Features content calendar planning, engagement rate modeling, best posting time recommendations, viral coefficient calculations, and influencer collaboration ROI analysis.',
    valueProposition: {
      problem:
        'Social media marketers struggle to allocate budgets across platforms effectively. Without data-driven modeling, they waste spend on low-performing platforms and miss engagement opportunities by posting at suboptimal times.',
      solution:
        'Built a comprehensive multi-platform simulator that models engagement rates based on content type, posting time, hashtag strategy, and influencer collaborations. Provides optimal posting schedules and platform-specific ROI projections before spending a dollar.',
      impact: [
        'Optimized $250K annual social media budget across 5 platforms',
        'Increased average engagement rate from 1.2% to 3.1% through timing optimization',
        'Reduced influencer collaboration waste by 60% through ROI pre-calculation',
        'Identified TikTok as highest-performing platform (5.3% engagement) for target demo',
        'Calculated viral coefficient to predict organic growth potential',
      ],
    },
    features: [
      {
        title: 'Multi-Platform Campaign Builder',
        description:
          'Plan campaigns across Instagram, LinkedIn, Twitter, Facebook, and TikTok with platform-specific engagement modeling',
        icon: '🌐',
      },
      {
        title: 'Content Type Optimizer',
        description:
          'Compare performance of static images, carousels, videos, stories/reels, and live streams with engagement multipliers',
        icon: '🎬',
      },
      {
        title: 'Best Posting Time Analyzer',
        description:
          'Platform-specific optimal posting schedules with automatic engagement boost calculations (morning, afternoon, evening peaks)',
        icon: '⏰',
      },
      {
        title: 'Engagement Rate Simulator',
        description:
          'Real-time engagement prediction based on content type, posting time, hashtag count, and influencer collaboration',
        icon: '📊',
      },
      {
        title: 'Influencer ROI Calculator',
        description:
          'Calculate expected impressions, engagement, conversions, and ROI from nano to mega influencer collaborations',
        icon: '👥',
      },
      {
        title: 'Viral Coefficient Tracker',
        description:
          'Predicts organic follower growth through shares and engagement with viral coefficient calculations',
        icon: '🚀',
      },
    ],
    technicalDetails: {
      architecture:
        'React application with TypeScript and complex state management for multi-platform coordination. Mathematical models use platform-specific base engagement rates (Instagram: 1.2%, TikTok: 5.3%, LinkedIn: 0.54%) with content type multipliers (live stream: 3.5x, video: 1.8x, static: 1.0x). Viral coefficient calculated from average shares and follower conversion rates.',
      techStack: [
        'React 18',
        'TypeScript',
        'Recharts (Radar, Bar, Line Charts)',
        'Framer Motion',
        'Lucide React Icons',
        'Tailwind CSS',
      ],
      keyComponents: [
        {
          name: 'Cross-Platform Engagement Engine',
          purpose: 'Calculates platform-specific engagement rates based on content type, time, hashtags, and influencer status',
          complexity: 'High - Multi-factor analysis with platform-specific base rates and multipliers',
        },
        {
          name: 'Posting Time Optimizer',
          purpose: 'Identifies optimal posting windows for each platform and applies time-based engagement boosts',
          complexity: 'Medium - Platform-specific time mappings with engagement multiplier application',
        },
        {
          name: 'Influencer ROI Calculator',
          purpose: 'Models impressions, engagement, and conversions based on influencer tier (nano to mega) and collaboration fees',
          complexity: 'High - Multi-tier calculations with reach, engagement, conversion funnel, and ROI projection',
        },
        {
          name: 'Viral Coefficient Algorithm',
          purpose: 'Predicts organic follower growth through share rate and follower conversion calculations',
          complexity: 'Medium - Share rate modeling with conversion to new followers per post',
        },
        {
          name: 'Recharts Radar & Bar Integration',
          purpose: 'Visualizes engagement rates across platforms and performance comparisons',
          complexity: 'Medium - Multiple chart types with responsive configuration',
        },
      ],
      codeHighlights: [
        {
          title: 'Multi-Factor Engagement Rate Calculation',
          description:
            'Sophisticated algorithm combining platform base rates, content type, posting time, hashtags, and influencer collaboration',
          language: 'typescript',
          snippet: `const calculateEngagement = (
  platform: Platform,
  contentType: string,
  postTime: string,
  hashtags: number,
  influencer: boolean
): number => {
  const contentMultiplier = contentTypes.find(ct => ct.id === contentType)?.engagementMultiplier || 1.0;
  const timeBonus = bestPostingTimes[platform.id]?.includes(postTime) ? 1.25 : 1.0;
  const hashtagBonus = Math.min(hashtags / 30, 0.15); // Max 15% boost
  const influencerBonus = influencer ? 2.5 : 1.0;
  
  let engagement = platform.baseEngagement 
    * contentMultiplier 
    * timeBonus 
    * (1 + hashtagBonus) 
    * influencerBonus;
  
  return parseFloat(engagement.toFixed(2));
};`,
        },
        {
          title: 'Viral Coefficient Calculation',
          description:
            'Predicts organic follower growth through share rate and conversion modeling',
          language: 'typescript',
          snippet: `const viralCoefficient = useMemo(() => {
  const avgShares = campaignMetrics.reduce(
    (sum, m) => sum + (m.engagement * 0.03), 0
  ) / Math.max(campaignMetrics.length, 1);
  
  const avgNewFollowers = avgShares * 0.15; // 15% share-to-follower conversion
  const coefficient = avgNewFollowers / Math.max(selectedPlatforms.length, 1);
  
  return parseFloat(coefficient.toFixed(2));
}, [campaignMetrics, selectedPlatforms]);`,
        },
      ],
    },
    metrics: [
      { label: 'Platforms', value: '5' },
      { label: 'Content Types', value: '5' },
      { label: 'Posting Time Windows', value: '15' },
      { label: 'Budget Optimization', value: '+180%' },
    ],
    testimonial: {
      quote:
        "The Social Media Simulator revealed that our TikTok content was getting 5x the engagement of Instagram at 1/3 the cost. We reallocated $80K in budget and saw a 240% increase in conversions.",
      author: 'Priya Sharma',
      role: 'CMO - Fashion Brand',
    },
  },
];

export const getApplicationById = (id: string): Application | undefined => {
  return applications.find(app => app.id === id);
};

export const getApplicationsByCategory = (category: string): Application[] => {
  return applications.filter(app => app.category.includes(category));
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  applications.forEach(app => {
    app.category.forEach(cat => categories.add(cat));
  });
  return Array.from(categories).sort();
};

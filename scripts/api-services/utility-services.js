/**
 * Utility API Services
 * 
 * Collection of miscellaneous API utilities:
 * - UI Avatars (avatar generation)
 * - QR Code generation
 * - RandomUser (demo data)
 * - Advice Slip (quotes)
 * 
 * All services are free and require no authentication
 */

/**
 * UI Avatars Service
 * Generate avatar images from text
 */
class UIAvatarsService {
  constructor() {
    this.baseUrl = 'https://ui-avatars.com/api';
  }

  /**
   * Generate avatar URL
   */
  getAvatarUrl(name, options = {}) {
    const {
      size = 128,
      background = '007bff',
      color = 'ffffff',
      bold = true,
      rounded = false,
      uppercase = true,
      length = 2, // number of initials
      fontSize = 0.5, // 0-1
      format = 'svg', // svg or png
    } = options;

    const params = new URLSearchParams({
      name: name,
      size: size.toString(),
      background: background.replace('#', ''),
      color: color.replace('#', ''),
      bold: bold.toString(),
      rounded: rounded.toString(),
      uppercase: uppercase.toString(),
      length: length.toString(),
      'font-size': fontSize.toString(),
      format,
    });

    return `${this.baseUrl}/?${params}`;
  }

  /**
   * Generate multiple avatars
   */
  generateAvatars(names, options = {}) {
    return names.map(name => ({
      name,
      url: this.getAvatarUrl(name, options),
    }));
  }
}

/**
 * QR Code Generator Service
 */
class QRCodeService {
  constructor() {
    this.baseUrl = 'https://api.qrserver.com/v1/create-qr-code';
  }

  /**
   * Generate QR code URL
   */
  getQRCodeUrl(data, options = {}) {
    const {
      size = 200,
      format = 'png', // png, gif, jpeg, jpg, svg
      margin = 0,
      errorCorrection = 'L', // L, M, Q, H
      color = '000000',
      bgcolor = 'ffffff',
    } = options;

    const params = new URLSearchParams({
      data: data,
      size: `${size}x${size}`,
      format,
      margin: margin.toString(),
      qzone: errorCorrection,
      color: color.replace('#', ''),
      bgcolor: bgcolor.replace('#', ''),
    });

    return `${this.baseUrl}/?${params}`;
  }

  /**
   * Download QR code
   */
  async downloadQRCode(data, outputPath, options = {}) {
    const url = this.getQRCodeUrl(data, options);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`QR code generation failed: ${response.status}`);
      }

      const { default: fs } = await import('fs/promises');
      const buffer = await response.arrayBuffer();
      await fs.writeFile(outputPath, Buffer.from(buffer));

      return { path: outputPath, size: buffer.byteLength };
    } catch (error) {
      console.error('QR code download error:', error.message);
      return null;
    }
  }
}

/**
 * RandomUser API Service
 * Generate realistic demo user data
 */
class RandomUserService {
  constructor() {
    this.baseUrl = 'https://randomuser.me/api';
  }

  /**
   * Generate random users
   */
  async generateUsers(options = {}) {
    const {
      count = 10,
      gender = null, // male, female
      nationality = null, // US, GB, FR, etc.
      seed = null, // for reproducible results
      include = null, // comma-separated fields
      exclude = null, // comma-separated fields
    } = options;

    const params = new URLSearchParams({
      results: count.toString(),
    });

    if (gender) params.append('gender', gender);
    if (nationality) params.append('nat', nationality);
    if (seed) params.append('seed', seed);
    if (include) params.append('inc', include);
    if (exclude) params.append('exc', exclude);

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      if (!response.ok) {
        throw new Error(`RandomUser API error: ${response.status}`);
      }

      const data = await response.json();
      
      return data.results.map(user => ({
        name: {
          first: user.name.first,
          last: user.name.last,
          full: `${user.name.first} ${user.name.last}`,
        },
        email: user.email,
        phone: user.phone,
        picture: {
          large: user.picture.large,
          medium: user.picture.medium,
          thumbnail: user.picture.thumbnail,
        },
        location: {
          city: user.location.city,
          state: user.location.state,
          country: user.location.country,
        },
        age: user.dob.age,
        gender: user.gender,
        username: user.login.username,
      }));
    } catch (error) {
      console.error('RandomUser API error:', error.message);
      return [];
    }
  }
}

/**
 * Advice Slip API Service
 * Get random advice quotes
 */
class AdviceSlipService {
  constructor() {
    this.baseUrl = 'https://api.adviceslip.com';
  }

  /**
   * Get random advice
   */
  async getRandomAdvice() {
    try {
      // Note: API requires cache busting for truly random results
      const response = await fetch(`${this.baseUrl}/advice`, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`Advice Slip API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        id: data.slip.id,
        advice: data.slip.advice,
      };
    } catch (error) {
      console.error('Advice Slip API error:', error.message);
      return null;
    }
  }

  /**
   * Search for advice
   */
  async searchAdvice(query) {
    try {
      const response = await fetch(`${this.baseUrl}/advice/search/${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Advice Slip API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.slips) {
        return [];
      }

      return data.slips.map(slip => ({
        id: slip.id,
        advice: slip.advice,
      }));
    } catch (error) {
      console.error('Advice search error:', error.message);
      return [];
    }
  }
}

/**
 * JokeAPI Service
 * Get programming and general jokes
 */
class JokeAPIService {
  constructor() {
    this.baseUrl = 'https://v2.jokeapi.dev/joke';
  }

  /**
   * Get random joke
   */
  async getRandomJoke(options = {}) {
    const {
      categories = ['Programming'], // Programming, Misc, Dark, Pun, Spooky, Christmas
      type = null, // single, twopart
      safe = true,
    } = options;

    const categoryPath = categories.join(',');
    const params = new URLSearchParams();
    
    if (type) params.append('type', type);
    if (safe) params.append('safe-mode', 'true');

    try {
      const url = `${this.baseUrl}/${categoryPath}?${params}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`JokeAPI error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message);
      }

      if (data.type === 'single') {
        return {
          type: 'single',
          joke: data.joke,
          category: data.category,
        };
      } else {
        return {
          type: 'twopart',
          setup: data.setup,
          delivery: data.delivery,
          category: data.category,
        };
      }
    } catch (error) {
      console.error('JokeAPI error:', error.message);
      return null;
    }
  }
}

/**
 * CLI Usage
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help') {
    console.log(`
🛠️  Utility API Services

Commands:
  avatar <name>             Generate avatar URL
  qr <data>                Generate QR code
  users [count]            Generate random users
  advice                   Get random advice
  joke                     Get random joke

Options:
  --size=<n>               Size for avatars/QR codes (default: 128/200)
  --background=<color>     Background color (hex)
  --color=<color>          Foreground color (hex)
  --format=<fmt>           Output format (svg, png, jpg)
  --output=<file>          Save to file
  --gender=<m/f>           User gender filter
  --nationality=<code>     User nationality (US, GB, etc.)
  --safe                   Safe mode for jokes

Examples:
  node utility-services.js avatar "John Doe"
  node utility-services.js avatar "Jane Smith" --size=256 --background=ff0000
  node utility-services.js qr "https://example.com" --output=qr.png
  node utility-services.js users 5 --gender=female
  node utility-services.js advice
  node utility-services.js joke --safe
    `);
    process.exit(0);
  }

  try {
    switch (command) {
      case 'avatar': {
        const name = args[1];
        if (!name) {
          console.error('❌ Error: Name required for avatar');
          process.exit(1);
        }

        const size = parseInt(args.find(a => a.startsWith('--size='))?.split('=')[1]) || 128;
        const background = args.find(a => a.startsWith('--background='))?.split('=')[1] || '007bff';
        const color = args.find(a => a.startsWith('--color='))?.split('=')[1] || 'ffffff';
        const format = args.find(a => a.startsWith('--format='))?.split('=')[1] || 'svg';

        const service = new UIAvatarsService();
        const url = service.getAvatarUrl(name, { size, background, color, format });

        console.log(`\n👤 Avatar URL for "${name}":`);
        console.log(url);
        break;
      }

      case 'qr': {
        const data = args[1];
        if (!data) {
          console.error('❌ Error: Data required for QR code');
          process.exit(1);
        }

        const size = parseInt(args.find(a => a.startsWith('--size='))?.split('=')[1]) || 200;
        const format = args.find(a => a.startsWith('--format='))?.split('=')[1] || 'png';
        const output = args.find(a => a.startsWith('--output='))?.split('=')[1];

        const service = new QRCodeService();

        if (output) {
          console.log(`\n📱 Generating QR code...`);
          const result = await service.downloadQRCode(data, output, { size, format });
          if (result) {
            console.log(`✅ Saved to: ${result.path} (${result.size} bytes)`);
          }
        } else {
          const url = service.getQRCodeUrl(data, { size, format });
          console.log(`\n📱 QR Code URL:`);
          console.log(url);
        }
        break;
      }

      case 'users': {
        const count = parseInt(args[1]) || 10;
        const gender = args.find(a => a.startsWith('--gender='))?.split('=')[1];
        const nationality = args.find(a => a.startsWith('--nationality='))?.split('=')[1];

        const service = new RandomUserService();
        console.log(`\n👥 Generating ${count} random user(s)...\n`);
        
        const users = await service.generateUsers({ count, gender, nationality });

        users.forEach((user, i) => {
          console.log(`${i + 1}. ${user.name.full}`);
          console.log(`   Email: ${user.email}`);
          console.log(`   Phone: ${user.phone}`);
          console.log(`   Location: ${user.location.city}, ${user.location.country}`);
          console.log(`   Age: ${user.age}, Gender: ${user.gender}`);
          console.log(`   Photo: ${user.picture.medium}\n`);
        });
        break;
      }

      case 'advice': {
        const service = new AdviceSlipService();
        console.log('\n💡 Getting random advice...\n');
        
        const advice = await service.getRandomAdvice();
        if (advice) {
          console.log(`"${advice.advice}"`);
          console.log(`\n(Advice #${advice.id})`);
        }
        break;
      }

      case 'joke': {
        const safe = args.includes('--safe');
        const service = new JokeAPIService();
        
        console.log('\n😄 Getting random joke...\n');
        
        const joke = await service.getRandomJoke({ safe });
        if (joke) {
          if (joke.type === 'single') {
            console.log(joke.joke);
          } else {
            console.log(joke.setup);
            console.log(`\n${joke.delivery}`);
          }
          console.log(`\n(Category: ${joke.category})`);
        }
        break;
      }

      default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('Run with --help for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

export {
  UIAvatarsService,
  QRCodeService,
  RandomUserService,
  AdviceSlipService,
  JokeAPIService,
};

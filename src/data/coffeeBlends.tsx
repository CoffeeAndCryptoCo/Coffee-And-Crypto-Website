export interface CoffeeBlend {
  id: number;
  name: string;
  origin: string;
  description: string;
  price: number;
  imageUrl: string;
  detailedDescription: string;
  tastingNotes: string[];
  process: string;
  altitude: string;
  roastLevel: string;
  acidity: string;
  body: string;
  brewingTips: {
    pourOver: {
      ratio: string;
      temperature: string;
      grindSize: string;
      bloomTime: string;
      totalTime: string;
    };
    frenchPress: {
      ratio: string;
      temperature: string;
      grindSize: string;
      steepTime: string;
    };
  };
}

export const coffeeBlends: CoffeeBlend[] = [
  {
    id: 1,
    name: "XRPresso",
    origin: "Ethiopia",
    description: "A complex, fruity blend with notes of bergamot and dark chocolate",
    price: 24.99,
    imageUrl: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1280",
    detailedDescription: "Our XRPresso represents the perfect fusion of traditional Ethiopian coffee craftsmanship and Web3 innovation. Sourced directly from premium farms in the Sidama region, each bean is carefully selected and roasted to unlock its full potential. This exceptional single-origin coffee delivers a complex flavor profile that evolves with each sip, making it the perfect companion for your crypto trading sessions, blockchain development work, or simply enjoying a moment of clarity in the fast-paced digital world.",
    tastingNotes: ["Dark chocolate", "Bergamot", "Natural fruit sweetness", "Floral undertones", "Clean, lingering finish"],
    process: "Washed",
    altitude: "1,800-2,100m",
    roastLevel: "Medium",
    acidity: "Bright",
    body: "Full",
    brewingTips: {
      pourOver: {
        ratio: "1:16",
        temperature: "200-205°F",
        grindSize: "Medium",
        bloomTime: "30 seconds",
        totalTime: "3-4 minutes"
      },
      frenchPress: {
        ratio: "1:12",
        temperature: "200°F",
        grindSize: "Coarse",
        steepTime: "4 minutes"
      }
    }
  },
  {
    id: 2,
    name: "Satoshis Blend",
    origin: "Guatemala",
    description: "The blend that Waffle House wishes they served",
    price: 22.99,
    imageUrl: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600",
    detailedDescription: "Named after the legendary Satoshi Nakamoto, this Guatemalan masterpiece embodies the revolutionary spirit of cryptocurrency. Grown in the volcanic highlands of Antigua, these beans develop their distinctive character through the unique terroir of ash-enriched soil and cool mountain air. Each cup delivers the perfect balance of innovation and tradition, making it ideal for those late-night coding sessions or early morning market analysis.",
    detailedDescription: "\"The blend that Waffle House wishes they served.\"\n\nNamed after the legendary Satoshi Nakamoto, this Guatemalan-led masterpiece embodies the revolutionary spirit of cryptocurrency—while keeping things grounded with the comfort and reliability of your favorite morning brew. Satoshi's Blend combines beans from the volcanic highlands of Antigua, Guatemala, with trusted farms in Brazil and Colombia, creating a medium roast that balances innovation with tradition. The ash-enriched soil and cool mountain air of Guatemala give it a vibrant complexity, while the Brazilian and Colombian beans smooth it out with rich, chocolatey, nutty notes.\n\nThis is your daily driver, made for modern life. Whether you're powering through your first Zoom call, trading the dip at 6am, coding late into the night, or just eating cold pizza before your next idea hits—Satoshi's Blend is exactly what you need to start the day right. Because not every cup needs to be a revelation. But this one just might be.\n\nAnd when you buy a bag, you're not just getting great coffee—you're joining the movement. Every purchase includes exclusive access to our Coffee & Crypto community, where passionate coffee lovers and forward-thinking crypto minds connect, share alpha, and brew up the future together.",
    tastingNotes: ["Caramel sweetness", "Citrus brightness", "Chocolate undertones", "Nutty finish", "Balanced acidity"],
    process: "Honey Processed",
    altitude: "1,500-1,800m",
    roastLevel: "Medium",
    acidity: "Medium",
    body: "Medium-Full",
    brewingTips: {
      pourOver: {
        ratio: "1:15",
        temperature: "195-200°F",
        grindSize: "Medium",
        bloomTime: "30 seconds",
        totalTime: "3-4 minutes"
      },
      frenchPress: {
        ratio: "1:12",
        temperature: "195°F",
        grindSize: "Coarse",
        steepTime: "4 minutes"
      }
    }
  },
  {
    id: 3,
    name: "Colombian Decaf Token",
    origin: "Colombia",
    description: "Smooth decaf with notes of chocolate and toasted nuts",
    price: 23.99,
    imageUrl: "https://images.pexels.com/photos/2159115/pexels-photo-2159115.jpeg?auto=compress&cs=tinysrgb&w=600",
    detailedDescription: "Proof that decaf doesn't mean compromise. Our Colombian Decaf Token uses the Swiss Water Process to remove caffeine while preserving the rich, complex flavors that make Colombian coffee legendary. Sourced from the coffee triangle region, this blend offers all the satisfaction of premium coffee without the caffeine crash - perfect for evening blockchain research or late-night DeFi strategy sessions.",
    tastingNotes: ["Rich chocolate", "Toasted almonds", "Caramel sweetness", "Smooth body", "Clean finish"],
    process: "Swiss Water Decaf",
    altitude: "1,200-1,600m",
    roastLevel: "Medium-Dark",
    acidity: "Low",
    body: "Full",
    brewingTips: {
      pourOver: {
        ratio: "1:16",
        temperature: "200-205°F",
        grindSize: "Medium",
        bloomTime: "30 seconds",
        totalTime: "3-4 minutes"
      },
      frenchPress: {
        ratio: "1:12",
        temperature: "200°F",
        grindSize: "Coarse",
        steepTime: "4 minutes"
      }
    }
  },
];
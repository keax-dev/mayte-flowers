import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalogue-description',
  templateUrl: './catalogue-description.component.html',
  styleUrls: ['./catalogue-description.component.css']
})
export class CatalogueDescriptionComponent implements OnInit {


  products: any = {
    explorer_rose: { "url": "/assets/roses/explorer.jpg", description: "Explorer roses, often found in deep shades of red, embody a spirit of adventure, courage, and the pursuit of the unknown. Their rich color reflects the intensity of exploring uncharted territories, both in life and love.", color: "Red", head: "6.7-7.1 cm", length: "60/70/80/90 cm", life: "14+" },
    checkmate_rose: { "url": "/assets/roses/Checkmate-macro.jpg", description: "Checkmate roses are solid red in color, symbolizing love, passion, and an assertive approach to matters of the heart. Their fiery hue conveys the determination and strategy needed in the game of love.", color: "Red", head: "6.7-7.1 cm", length: "60/70/80/90 cm", life: "14+" },
    freedom_rose: { url: "/assets/roses/FREEDOM.jpg", description: "Freedom roses are deep red, and they symbolize the concept of freedom in relationships, representing a liberated and passionate spirit. They are often used to convey the intensity of love and the desire for independence within a partnership.", color: "Red", head: "5.5-6.6 cm", length: "50/60/70/80 cm", life: "14+" },
    iguana_rose: { "url": "/assets/roses/Iguana_Bicolor_Single_X-1.jpg", description: "The Iguana rose features a subtle, not overly intense, shade of orange. This color represents uniqueness, creativity, and individuality, making it an ideal choice for expressing admiration and appreciation for someone's distinct qualities.", color: "Orange", head: "4.4-5.2 cm", length: "40/50/60 cm", life: "14+" },
    high_magic_rose: { "url": "/assets/roses/High-Magic-B.jpg", description: "High Magic roses are known for their bi-colored appearance, featuring deep red edges that gradually fade into a creamy white center. This unique coloration represents the harmonious fusion of intense emotions and unity. They are often associated with the idea that love can bridge the gap between contrasting feelings.", color: "Bicolor", head: "4.5-5.1 cm", length: "50/60/70/80 cm", life: "14+" },
    high_orange_magic_rose: { "url": "/assets/roses/High-Orange-Magic-B.jpg", description: "The High Orange rose boasts a vivid and intense orange shade that represents energy, enthusiasm, and a zest for life. It's a captivating choice that symbolizes the vibrancy of love and emotions.", color: "Bicolor", head: "4.5-5.1 cm", length: "50/60/70/80 cm", life: "14+" },
    pinkfloyd_rose: { "url": "/assets/roses/pinkfloyd-rose-skyroses.jpg", description: "Pinkfloyd roses have a deeper and more intense pink color than many other pink varieties, representing a vibrant and profound affection. They convey a strong sense of love and admiration, making them a passionate choice for romantic gestures.", color: "Hot Pink", head: "6-6.7 cm", length: "50/60/70 cm", life: "14+" },
    gotcha_rose: { "url": "/assets/roses/Gotcha-B.jpg", description: "The Gotcha rose is a vibrant and intense pink variety, radiating a playful and joyful spirit. Its lively color symbolizes the happiness and delight that comes from genuine connections and shared moments.", color: "Hot Pink", head: "6-6.7 cm", length: "50/60/70 cm", life: "14+" },
    topaz_rose: { "url": "/assets/roses/topaz_top.png", description: "Topaz roses come in delicate shades of pink, symbolizing affection, love, and gratitude. The soft color evokes a sense of tenderness and appreciation for those who receive them.", color: "Orange", head: "5.5-6 cm", length: "50/60/70 cm", life: "14+" },
    hermosa_rose: { "url": "/assets/roses/Hermosa_Aerial_View.jpg", description: "The Hermosa rose is a delicate, light pink variety that symbolizes beauty and grace. Its soft and gentle color conveys a sense of admiration and tenderness, making it a wonderful choice for expressing affection and appreciation.", color: "Lavender", head: "4.5-5.7 cm", length: "40/50/60 cm", life: "14+" },
    mandala_rose: { "url": "/assets/roses/rose-cream-sahara-3.jpg", description: "Mandala roses are known for their elegant pink petals with intricate and mesmerizing patterns along the edges. This unique appearance makes them a symbol of inner and outer beauty, balance, and spiritual awakening. They are often associated with the idea that life is a beautiful tapestry of interconnected moments.", color: "Pink", head: "6.1-6.3 cm", length: "60/70 cm", life: "14+" },
    pink_mondial_rose: { "url": "/assets/roses/Pink-Mondial-B.jpg", description: "Pink Mondial roses feature soft pink petals, symbolizing gratitude and appreciation for the beauty that surrounds us. Their gentle color is a reminder of the little moments that bring joy and happiness.", color: "Light Pink", head: "5.5-6 cm", length: "50/60/70 cm", life: "14+" },
    sahara_rose: { "url": "/assets/roses/rose-cream-sahara-3.jpg", description: "Sahara roses are characterized by their cream-like, ivory color reminiscent of desert sands. This color exudes simplicity, grace, and a serene beauty that draws parallels with the vast and tranquil desert landscape.", color: "White", head: "6.2-6.4 cm", length: "40/50/60 cm", life: "14+" },
    brighton_rose: { "url": "/assets/roses/Brighton.png", description: "The Brighton rose is a striking variety with intense, vivid yellow petals. Its vibrant color exudes a sense of happiness, optimism, and enthusiasm. The bright yellow hue captures attention and radiates warmth, making it a symbol of joy and vitality.", color: "Yellow", head: "5.7-6.2 cm", length: "50/60/70 cm", life: "14+" },
    tara_rose: { "url": "/assets/roses/Tara-B.jpg", description: "Tara roses are a cheerful yellow variety, radiating joy, happiness, and a sense of well-being. They symbolize the sunny and positive aspects of life, making them perfect for uplifting and celebratory occasions.", color: "Yellow", head: "5.7-6.2 cm", length: "50/60/70 cm", life: "14+" },
    tibet_rose: { "url": "/assets/roses/Tibet_White_SingleSt_X.jpg", description: "The Tibet rose is a delicate and pure white variety, symbolizing purity and tranquility. Its pristine, snow-like appearance evokes a sense of serenity, making it a popular choice for moments of calm reflection and remembrance.", color: "White", head: "6-6.4 cm", length: "40/50/60 cm", life: "14+" },
    mondial_rose: { "url": "/assets/roses/mondial.jpg", description: "Mondial roses are classic, elegant white roses, symbolizing purity, innocence, and everlasting love. Their pristine appearance makes them a timeless choice for weddings and romantic occasions.", color: "White", head: "6.4-7.3 cm", length: "50/60/70/80 cm", life: "14+" },
    vendela_rose: { "url": "/assets/roses/vendela.jpg", description: "Vendela roses are classic, with pale ivory or light pink petals that symbolize charm, grace, and timeless elegance. Their gentle color and appearance are perfect for expressing appreciation and admiration.", color: "Cream", head: "5.7-6 cm", length: "40/50/60 cm", life: "14+" },
    rainbow: { url: "/assets/gypsophila/RAINBOW.jpg", description: "Our Gypsophila Rainbow Mix offers a burst of vibrant hues. This enchanting blend showcases a medley of red, yellow, green, purple, and more, creating a colorful spectacle in every arrangement. Perfect for infusing joy and elegance into your floral designs, this mix is the ultimate choice for all occasions." },
    xcellent: { url: "/assets/gypsophila/XCELLENT.jpg", description: "" },
    dark_pink_: { url: "/assets/gypsophila/DARK_PINK.jpg", description: "Embrace the grace and beauty of pink Gypsophila in your floral arrangements. These gentle pink blooms add a touch of elegance to your bouquets and centerpieces, making them a delightful choice for any occasion." },
    purple: { url: "/assets/gypsophila/PURPLE.jpg", description: "Add a touch of regal elegance to your floral arrangements with purple Gypsophila, these delicate purple blooms bring a touch of sophistication to your bouquets and centerpieces, making them a captivating choice for all occasions." },
    blue: { url: "/assets/gypsophila/BLUE.jpg", description: "Transform your floral creations with the whimsical allure of blue Gypsophila, this delicate bloom adds a touch of enchantment to any arrangement, making it a charming choice for all your floral needs." },
    yellow: { url: "/assets/gypsophila/YELOW.jpg", description: "Brighten up your floral arrangements with the cheerful radiance of yellow Gypsophila, these delicate blooms bring a touch of sunshine to your bouquets and centerpieces, making them a delightful choice for all occasions." },
    red: { url: "/assets/gypsophila/RED.jpg", description: "Elevate your floral arrangements with the elegance and vibrancy of red Gypsophila, this delicate bloom adds a pop of color and sophistication to your bouquets and centerpieces, making it a captivating choice for all occasions." },
    green: { url: "/assets/gypsophila/GREEN.jpg ", description: "Embrace the soothing beauty of green Gypsophila, these delicate green blooms infuse a natural, serene elegance into your floral arrangements, making them a refreshing choice for any occasion." },
  };

  product: any = {};
  name: any = this.route.snapshot.params['product'];
  category: any = this.route.snapshot.params['id'];
  show: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.show = this.category === 'roses';
  }

  ngOnInit(): void {
    this.product = this.products[this.name];
    if (!this.product) this.router.navigateByUrl('/gallery');
    this.name = this.name.replace(/_/g, ' ').toUpperCase();
  }

}

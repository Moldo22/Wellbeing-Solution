import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions.html',
  styleUrls: ['./subscriptions.css']
})
export class Subscriptions {
  
  // Starea selectată la Pasul 1 (false = lunar, true = anual)
  isAnnual: boolean = false;

  // Prețurile lunare de bază pentru pachetele de date sportive
  private prices = {
    local: 49,
    pro: 149,
    enterprise: 499
  };

  constructor() {}

  /**
   * Returnează textul explicativ pentru perioada de facturare
   */
  get billingPeriodText(): string {
    return this.isAnnual ? 'o singură dată pe an' : 'în fiecare lună';
  }

  /**
   * Calculează prețul final aplicând discountul de 2 luni gratuite pentru modul Anual
   */
  getPrice(plan: 'local' | 'pro' | 'enterprise'): number {
    const basePrice = this.prices[plan];
    return this.isAnnual ? basePrice * 10 : basePrice;
  }

  /**
   * Calculează valoarea exactă economisită de partener (valoarea a 2 luni de abonament)
   */
  getSavings(plan: 'local' | 'pro' | 'enterprise'): number {
    return this.prices[plan] * 2;
  }

  /**
   * Procesează selecția pachetului și afișează o confirmare clară
   */
  selectPlan(planName: string, planKey: 'local' | 'pro' | 'enterprise'): void {
    const totalPlata = this.getPrice(planKey);
    const perioada = this.isAnnual ? 'ANUALĂ' : 'LUNARĂ';
    
    alert(
      `Ați selectat pachetul: "${planName}"\n` +
      `Tip facturare: Perioadă ${perioada}\n` +
      `Sumă totală de plată: ${totalPlata} €\n\n` +
      `Sunteți redirecționat către zona securizată pentru finalizarea activării.`
    );
  }
}
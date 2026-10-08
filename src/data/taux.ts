export type CurrencyCode = 'EUR' | 'USD' | 'TND' | 'GBP' | 'JPY' | 'CAD'

export interface Currency {
  code: CurrencyCode
  label: string
  rate: number
}

export const currencies: Currency[] = [
  { code: 'EUR', label: 'Euro', rate: 1.0 },
  { code: 'USD', label: 'Dollar américain', rate: 1.17 },
  { code: 'TND', label: 'Dinar tunisien', rate: 3.4 },
  { code: 'GBP', label: 'Livre sterling', rate: 0.87 },
  { code: 'JPY', label: 'Yen japonais', rate: 172.5 },
  { code: 'CAD', label: 'Dollar canadien', rate: 1.62 },
]

export const rates: Record<CurrencyCode, number> = Object.fromEntries(
  currencies.map(({ code, rate }) => [code, rate]),
) as Record<CurrencyCode, number>

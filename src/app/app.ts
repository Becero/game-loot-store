import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type VideoReference = {
  title: string;
  game: string;
  channel: string;
  description: string;
  watchUrl: string;
  embedUrl: SafeResourceUrl;
};

type UserRole = 'admin' | 'user';
type AuthMode = 'login' | 'register';

type StoredAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
};

type SessionAccount = Omit<StoredAccount, 'password'>;

type SalesReport = {
  game: string;
  orders: number;
  revenue: number;
  averageTicket: number;
};

type DemandReport = {
  term: string;
  searches: number;
  trend: string;
  intent: string;
};

type AccountMetrics = {
  total: number;
  admins: number;
  users: number;
  latestAccountName: string;
};

type TrendingGame = {
  title: string;
  platform: string;
  currentPlayers: number;
  peakToday: number;
  imageUrl: string;
  storeUrl: string;
};

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly accountsStorageKey = 'lootforge.accounts';
  private readonly sessionStorageKey = 'lootforge.session';

  protected authMode: AuthMode = 'login';
  protected authError = '';
  protected authSuccess = '';
  protected currentUser: SessionAccount | null = null;
  protected isTrendingModalOpen = true;

  protected readonly demoAccounts = [
    {
      role: 'Administrador',
      email: 'admin@lootforge.test',
      password: 'Admin@123'
    },
    {
      role: 'Usuario',
      email: 'usuario@lootforge.test',
      password: 'User@123'
    }
  ] as const;

  protected accountMetrics: AccountMetrics = {
    total: 0,
    admins: 0,
    users: 0,
    latestAccountName: 'Nenhum cadastro recente'
  };

  protected loginForm = {
    email: '',
    password: ''
  };

  protected registerForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  protected readonly featuredCategories = [
    {
      name: 'Raids e Gold',
      game: 'World of Warcraft',
      description: 'Packs de gold, consumiveis de raid e itens raros entregues por vendedores verificados.',
      eta: 'Entrega em ate 15 min',
      tone: 'ember'
    },
    {
      name: 'Skins e Chaves',
      game: 'Counter-Strike 2',
      description: 'Inventario premium com rotacao diaria de caixas, chaves e skins de alto giro.',
      eta: 'Liberacao instantanea',
      tone: 'aurora'
    },
    {
      name: 'Boost e Contas',
      game: 'League of Legends',
      description: 'Servicos para ranked, contas prontas para smurf e bundles com campeoes liberados.',
      eta: 'Ativacao guiada',
      tone: 'storm'
    },
    {
      name: 'Moedas e Passes',
      game: 'Diablo IV',
      description: 'Platina, itens sazonais e upgrades para acelerar o farming de endgame.',
      eta: 'Reposicao 24/7',
      tone: 'glow'
    }
  ];

  protected readonly featuredDeals = [
    {
      name: 'Pacote 200k Gold',
      game: 'WoW Retail',
      price: 89.9,
      delivery: '15 min',
      tag: 'Mais vendido',
      imageUrl: '/products/wow-retail-real.jpg'
    },
    {
      name: 'Heroic Raid Carry',
      game: 'WoW Classic',
      price: 219.9,
      delivery: 'Agendamento no mesmo dia',
      tag: 'Top guild',
      imageUrl: '/products/wow-classic-real.png'
    },
    {
      name: 'Bundle 20 Chaves',
      game: 'CS2',
      price: 57.5,
      delivery: 'Instantaneo',
      tag: 'Estoque alto',
      imageUrl: '/products/cs2-real.jpg'
    },
    {
      name: 'Conta Emerald Ready',
      game: 'LoL',
      price: 149.9,
      delivery: 'Transferencia segura',
      tag: 'Ranked pronta',
      imageUrl: '/products/lol-real.jpg'
    },
    {
      name: 'Platina 5.000',
      game: 'Diablo IV',
      price: 74.9,
      delivery: 'Codigo digital',
      tag: 'Sazonal',
      imageUrl: '/products/diablo4-real.jpg'
    },
    {
      name: 'Boost Mythic+ 10',
      game: 'WoW Retail',
      price: 129.9,
      delivery: 'Janelas flexiveis',
      tag: 'Equipe premium',
      imageUrl: '/products/wow-retail-real.jpg'
    }
  ];

  protected readonly serviceHighlights = [
    {
      step: '01',
      title: 'Catalogo curado',
      description: 'Os anuncios passam por auditoria manual, com reputacao publica e historico de entrega.'
    },
    {
      step: '02',
      title: 'Checkout protegido',
      description: 'Pagamento dividido por etapas, com confirmacao antes da liberacao total ao vendedor.'
    },
    {
      step: '03',
      title: 'Suporte humano',
      description: 'Atendimento em tempo real para confirmar faccao, servidor, horario e metodo de trade.'
    }
  ];

  protected readonly mmoVideos: VideoReference[] = [
    {
      title: 'Dark Heart In-Game Cinematic',
      game: 'World of Warcraft',
      channel: 'World of Warcraft',
      description: 'Uma referencia cinematica para destacar expansoes, lore e campanhas de MMO com alto impacto visual.',
      watchUrl: 'https://www.youtube.com/watch?v=jOgHVEQvUvw',
      embedUrl: this.toEmbedUrl('jOgHVEQvUvw')
    },
    {
      title: 'FINAL FANTASY XIV: ENDWALKER Teaser Trailer',
      game: 'Final Fantasy XIV',
      channel: 'FINAL FANTASY XIV',
      description: 'Serve como inspiracao para blocos de trailer, promocoes sazonais e paginas de pre-venda.',
      watchUrl: 'https://www.youtube.com/watch?v=7-bkJ2ZoW6k',
      embedUrl: this.toEmbedUrl('7-bkJ2ZoW6k')
    },
    {
      title: 'Welcome to The Elder Scrolls Online',
      game: 'The Elder Scrolls Online',
      channel: 'The Elder Scrolls Online',
      description: 'Boa referencia para apresentar features, progressao e onboarding de jogadores novos.',
      watchUrl: 'https://www.youtube.com/watch?v=ojDai6GBR8Y',
      embedUrl: this.toEmbedUrl('ojDai6GBR8Y')
    },
    {
      title: 'Lost Ark 101: The Story of Arkesia',
      game: 'Lost Ark',
      channel: 'Lost Ark',
      description: 'Ajuda a compor uma secao editorial com foco em mundo, faccoes e narrativa do jogo.',
      watchUrl: 'https://www.youtube.com/watch?v=OX96eqggJqg',
      embedUrl: this.toEmbedUrl('OX96eqggJqg')
    }
  ];

  protected readonly salesReports: SalesReport[] = [
    {
      game: 'World of Warcraft',
      orders: 148,
      revenue: 18492.4,
      averageTicket: 124.95
    },
    {
      game: 'Counter-Strike 2',
      orders: 96,
      revenue: 6845.6,
      averageTicket: 71.31
    },
    {
      game: 'League of Legends',
      orders: 74,
      revenue: 9210.2,
      averageTicket: 124.46
    },
    {
      game: 'Diablo IV',
      orders: 51,
      revenue: 3874.9,
      averageTicket: 75.98
    }
  ];

  protected readonly demandReports: DemandReport[] = [
    {
      term: 'gold wow',
      searches: 1280,
      trend: '+18%',
      intent: 'Compra imediata'
    },
    {
      term: 'boost mythic',
      searches: 940,
      trend: '+11%',
      intent: 'Servico premium'
    },
    {
      term: 'conta lol smurf',
      searches: 760,
      trend: '+7%',
      intent: 'Conta pronta'
    },
    {
      term: 'platina diablo',
      searches: 530,
      trend: '+4%',
      intent: 'Recarga digital'
    }
  ];

  protected readonly trendingGames: TrendingGame[] = [
    {
      title: 'Counter-Strike 2',
      platform: 'Steam agora',
      currentPlayers: 889603,
      peakToday: 1587345,
      imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
      storeUrl: 'https://store.steampowered.com/app/730/CounterStrike_2/'
    },
    {
      title: 'Dota 2',
      platform: 'Steam agora',
      currentPlayers: 496299,
      peakToday: 825821,
      imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg',
      storeUrl: 'https://store.steampowered.com/app/570/Dota_2/'
    },
    {
      title: 'Resident Evil Requiem',
      platform: 'Steam agora',
      currentPlayers: 249259,
      peakToday: 344214,
      imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3764200/header.jpg',
      storeUrl: 'https://store.steampowered.com/app/3764200/Resident_Evil_Requiem/'
    }
  ];

  ngOnInit(): void {
    this.seedDemoAccounts();
    this.refreshAccountMetrics();
    this.loadSession();
  }

  protected setAuthMode(mode: AuthMode): void {
    this.authMode = mode;
    this.clearFeedback();
  }

  protected login(): void {
    this.clearFeedback();

    const email = this.loginForm.email.trim().toLowerCase();
    const password = this.loginForm.password.trim();

    if (!email || !password) {
      this.authError = 'Preencha e-mail e senha para entrar.';
      return;
    }

    const account = this.getAccounts().find((item) => item.email === email && item.password === password);

    if (!account) {
      this.authError = 'Credenciais invalidas. Confira os dados e tente novamente.';
      return;
    }

    this.currentUser = this.toSessionAccount(account);
    this.persistSession(this.currentUser);
    this.loginForm = { email: '', password: '' };
    this.authSuccess = `Login realizado com sucesso. Bem-vindo, ${this.currentUser.name}.`;
  }

  protected register(): void {
    this.clearFeedback();

    const name = this.registerForm.name.trim();
    const email = this.registerForm.email.trim().toLowerCase();
    const password = this.registerForm.password.trim();
    const confirmPassword = this.registerForm.confirmPassword.trim();

    if (!name || !email || !password || !confirmPassword) {
      this.authError = 'Preencha todos os campos para criar a conta.';
      return;
    }

    if (!this.isValidEmail(email)) {
      this.authError = 'Informe um e-mail valido.';
      return;
    }

    if (password.length < 6) {
      this.authError = 'A senha precisa ter pelo menos 6 caracteres.';
      return;
    }

    if (password !== confirmPassword) {
      this.authError = 'A confirmacao de senha nao confere.';
      return;
    }

    const accounts = this.getAccounts();
    const emailInUse = accounts.some((item) => item.email === email);

    if (emailInUse) {
      this.authError = 'Ja existe uma conta cadastrada com esse e-mail.';
      return;
    }

    const newAccount: StoredAccount = {
      id: this.createId(),
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    const nextAccounts = [...accounts, newAccount];
    this.saveAccounts(nextAccounts);
    this.refreshAccountMetrics(nextAccounts);

    this.currentUser = this.toSessionAccount(newAccount);
    this.persistSession(this.currentUser);
    this.registerForm = { name: '', email: '', password: '', confirmPassword: '' };
    this.authMode = 'login';
    this.authSuccess = 'Conta criada com sucesso. Sua sessao ja esta ativa.';
  }

  protected logout(): void {
    this.currentUser = null;
    this.clearFeedback();
    this.authSuccess = 'Sessao encerrada.';
    this.clearSession();
  }

  protected useDemoAccount(role: UserRole): void {
    const account = this.getAccounts().find((item) => item.role === role);

    if (!account) {
      this.authError = 'Conta de teste nao encontrada.';
      return;
    }

    this.setAuthMode('login');
    this.loginForm = {
      email: account.email,
      password: account.password
    };
  }

  protected get currentRoleLabel(): string {
    return this.currentUser?.role === 'admin' ? 'Administrador' : 'Usuario';
  }

  protected get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  protected get canViewReports(): boolean {
    return this.isAdmin;
  }

  protected openTrendingModal(): void {
    this.isTrendingModalOpen = true;
  }

  protected closeTrendingModal(): void {
    this.isTrendingModalOpen = false;
  }

  protected get totalOrders(): number {
    return this.salesReports.reduce((total, item) => total + item.orders, 0);
  }

  protected get totalRevenue(): number {
    return this.salesReports.reduce((total, item) => total + item.revenue, 0);
  }

  protected get hottestDemand(): DemandReport {
    return this.demandReports[0];
  }

  private seedDemoAccounts(): void {
    const currentAccounts = this.getAccounts();

    if (currentAccounts.length > 0) {
      return;
    }

    const seedAccounts: StoredAccount[] = [
      {
        id: this.createId(),
        name: 'Admin LootForge',
        email: 'admin@lootforge.test',
        password: 'Admin@123',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: this.createId(),
        name: 'Usuario Teste',
        email: 'usuario@lootforge.test',
        password: 'User@123',
        role: 'user',
        createdAt: new Date().toISOString()
      }
    ];

    this.saveAccounts(seedAccounts);
  }

  private refreshAccountMetrics(accounts = this.getAccounts()): void {
    const latestAccount = accounts.at(-1);

    this.accountMetrics = {
      total: accounts.length,
      admins: accounts.filter((item) => item.role === 'admin').length,
      users: accounts.filter((item) => item.role === 'user').length,
      latestAccountName: latestAccount?.name ?? 'Nenhum cadastro recente'
    };
  }

  private loadSession(): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    const rawSession = storage.getItem(this.sessionStorageKey);

    if (!rawSession) {
      return;
    }

    try {
      this.currentUser = JSON.parse(rawSession) as SessionAccount;
    } catch {
      this.clearSession();
    }
  }

  private getAccounts(): StoredAccount[] {
    const storage = this.getStorage();

    if (!storage) {
      return [];
    }

    const rawAccounts = storage.getItem(this.accountsStorageKey);

    if (!rawAccounts) {
      return [];
    }

    try {
      return JSON.parse(rawAccounts) as StoredAccount[];
    } catch {
      return [];
    }
  }

  private saveAccounts(accounts: StoredAccount[]): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(this.accountsStorageKey, JSON.stringify(accounts));
  }

  private persistSession(session: SessionAccount): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(this.sessionStorageKey, JSON.stringify(session));
  }

  private clearSession(): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    storage.removeItem(this.sessionStorageKey);
  }

  private getStorage(): Storage | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    return window.localStorage;
  }

  private toSessionAccount(account: StoredAccount): SessionAccount {
    const { password: _, ...session } = account;
    return session;
  }

  private clearFeedback(): void {
    this.authError = '';
    this.authSuccess = '';
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private createId(): string {
    return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  private toEmbedUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}

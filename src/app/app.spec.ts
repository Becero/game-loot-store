import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the marketplace brand', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-name')?.textContent).toContain('LootForge');
  });

  it('should render the auth panel', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.auth-panel h2')?.textContent).toContain('Cadastro e login');
  });

  it('should hide the reports section by default', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.reports')).toBeNull();
  });

  it('should render the reports section for admin session', () => {
    localStorage.setItem(
      'lootforge.session',
      JSON.stringify({
        id: 'admin-1',
        name: 'Admin LootForge',
        email: 'admin@lootforge.test',
        role: 'admin',
        createdAt: new Date().toISOString()
      })
    );

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.reports h2')?.textContent).toContain('Painel de vendas, procura e cadastro');
  });

  it('should render the trending games modal', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.trending-modal h2')?.textContent).toContain('3 jogos mais jogados do momento');
  });
});

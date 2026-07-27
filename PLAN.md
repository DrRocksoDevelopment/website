# План доработок

## SEO (с учётом Cloudflare Workers + сборка)

### Проблемы
- [ ] Весь контент в JSON, рендер через JS — поисковики видят пустую страницу
- [ ] Нет отдельных URL для проектов
- [ ] Нет Open Graph / Twitter Cards
- [ ] Нет JSON-LD (structured data)

### Возможные решения
- [ ] Пререндер/SSR через Cloudflare Workers (шаг сборки)
- [ ] Статическая генерация HTML с контентом на этапе сборки
- [ ] Open Graph и JSON-LD для главной страницы
- [ ] Отдельные страницы проектов (если нужна глубокая индексация)

## Технический долг

- [ ] Проверить Lighthouse (Performance, Accessibility, SEO, Best Practices)
- [ ] favicon в разных форматах (ico, png) для старых браузеров

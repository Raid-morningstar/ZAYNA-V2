import Link from "next/link";
import {
  AlertTriangle,
  Boxes,
  CircleDollarSign,
  Clock3,
  Layers3,
  Package2,
  Percent,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

import {
  AdminPageHero,
  EmptyState,
  MetricCard,
  QuickLinkCard,
  StatusPill,
  adminCurrencyFormatter,
  adminDateFormatter,
  adminSurfaceClassName,
  formatTier,
} from "@/components/admin/AdminPagePrimitives";
import { Badge } from "@/components/ui/badge";
import { getAdminOverviewData } from "@/lib/admin-pages";
import { cn } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const metricCards = [
  { key: "totalOrders", label: "Commandes", icon: ShoppingBag, tone: "bg-sky-50 text-sky-700 ring-sky-200" },
  { key: "totalRevenue", label: "Revenus", icon: CircleDollarSign, tone: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  { key: "pendingOrders", label: "A traiter", icon: Clock3, tone: "bg-amber-50 text-amber-700 ring-amber-200" },
  { key: "totalProducts", label: "Produits", icon: Package2, tone: "bg-violet-50 text-violet-700 ring-violet-200" },
  { key: "totalCategories", label: "Categories", icon: Layers3, tone: "bg-orange-50 text-orange-700 ring-orange-200" },
  { key: "totalBrands", label: "Marques", icon: Store, tone: "bg-cyan-50 text-cyan-700 ring-cyan-200" },
  { key: "activePromoCodes", label: "Promos actives", icon: Percent, tone: "bg-pink-50 text-pink-700 ring-pink-200" },
  { key: "totalCustomers", label: "Clients", icon: Users, tone: "bg-indigo-50 text-indigo-700 ring-indigo-200" },
] as const;

const getQueryValue = (
  searchParams: Record<string, string | string[] | undefined>,
  key: string
) => {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [resolvedSearchParams, data] = await Promise.all([
    searchParams,
    getAdminOverviewData(),
  ]);
  const statusMessage = getQueryValue(resolvedSearchParams, "status");
  const errorMessage = getQueryValue(resolvedSearchParams, "error");

  return (
    <div className="space-y-8 lg:space-y-10">
      <AdminPageHero
        badge="Pilotage rapide"
        title="Une vue claire sur la boutique, sans ecran surcharge."
        description="Suivez les commandes, le stock, les clients et les promotions depuis un dashboard fluide. Chaque espace de gestion a maintenant sa propre page pour garder l'admin rapide."
        actions={
          <>
            <Link
              href="/admin/orders"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-shop_btn_dark_green transition-transform hover:-translate-y-0.5"
            >
              Voir les commandes
            </Link>
            <Link
              href="/admin/products#new-product"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              Ajouter un produit
            </Link>
            <Link
              href="/admin/promos#new-promo"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              Lancer une promo
            </Link>
          </>
        }
        aside={
          <>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">A surveiller</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                  Commandes a traiter
                </p>
                <p className="mt-2 text-3xl font-semibold">{data.metrics.pendingOrders}</p>
              </div>
              <div className="rounded-2xl bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                  Stock faible
                </p>
                <p className="mt-2 text-3xl font-semibold">{data.metrics.lowStockProducts}</p>
              </div>
              <div className="rounded-2xl bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                  Promos qui expirent vite
                </p>
                <p className="mt-2 text-3xl font-semibold">{data.metrics.expiringPromoCodes}</p>
              </div>
            </div>
          </>
        }
      />

      {statusMessage ? (
        <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {statusMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {errorMessage}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => {
          const value =
            card.key === "totalRevenue"
              ? adminCurrencyFormatter.format(data.metrics.totalRevenue)
              : new Intl.NumberFormat("fr-MA").format(data.metrics[card.key]);

          return (
            <MetricCard
              key={card.key}
              icon={card.icon}
              label={card.label}
              value={value}
              helper="Mis a jour depuis les donnees de la boutique."
              tone={card.tone}
            />
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.95fr)_minmax(0,0.95fr)]">
        <div className={cn(adminSurfaceClassName, "p-6")}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-shop_btn_dark_green" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Acces rapides
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                Gerer la boutique par espace
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <QuickLinkCard
              href="/admin/orders"
              title="Commandes"
              description="Suivre les ventes, ouvrir les details et changer les statuts."
            />
            <QuickLinkCard
              href="/admin/products"
              title="Produits"
              description="Ajouter des produits, gerer le stock et les photos."
            />
            <QuickLinkCard
              href="/admin/categories"
              title="Categories"
              description="Structurer le catalogue avec des rayons clairs."
            />
            <QuickLinkCard
              href="/admin/brands"
              title="Marques"
              description="Mettre en avant les marques et leurs logos."
            />
            <QuickLinkCard
              href="/admin/promos"
              title="Promotions"
              description="Creer et ajuster les codes promo en quelques clics."
            />
          </div>
        </div>

        <div className={cn(adminSurfaceClassName, "p-6")}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-shop_btn_dark_green" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Dernieres commandes
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                Activite recente
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {data.recentOrders.length ? (
              data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {order.customerName}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>#{order.orderNumber.slice(-8).toUpperCase()}</span>
                        <span>{adminDateFormatter.format(order.orderDate)}</span>
                        <span>{order.itemsCount} article(s)</span>
                      </div>
                    </div>
                    <StatusPill value={order.adminStage} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">{order.email}</span>
                    <span className="font-semibold text-slate-900">
                      {adminCurrencyFormatter.format(order.totalPrice)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                title="Aucune commande recente"
                description="Les nouvelles ventes apparaitront ici automatiquement."
              />
            )}
          </div>
        </div>

        <div className={cn(adminSurfaceClassName, "p-6")}>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-shop_btn_dark_green" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Clients
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                Derniers profils actifs
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {data.recentCustomers.length ? (
              data.recentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {customer.fullName}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {customer.email}
                      </p>
                    </div>
                    <StatusPill
                      value={customer.loyaltyTier}
                      label={formatTier(customer.loyaltyTier)}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                    <span>{customer.orderCount} commande(s)</span>
                    <span>{adminCurrencyFormatter.format(customer.totalSpent)}</span>
                    <span>{customer.loyaltyPoints} pts</span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                title="Aucun client"
                description="Les profils clients s'afficheront ici apres les premieres commandes."
              />
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className={cn(adminSurfaceClassName, "p-6")}>
          <div className="flex items-center gap-2">
            <Boxes className="h-5 w-5 text-shop_btn_dark_green" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Stock sensible
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                Produits a surveiller
              </h2>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {data.lowStockItems.length ? (
              data.lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <StatusPill
                      value={item.stock === 0 ? "out" : "pending"}
                      label={item.stock === 0 ? "Rupture" : `Stock ${item.stock}`}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 xl:col-span-3">
                <EmptyState
                  title="Aucun stock faible"
                  description="Tous les produits ont actuellement un stock confortable."
                />
              </div>
            )}
          </div>
        </div>

        <div className={cn(adminSurfaceClassName, "p-6")}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-shop_btn_dark_green" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Repartition
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                Etats des commandes
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {data.orderStageBreakdown.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between rounded-[22px] border border-slate-200 bg-slate-50/75 px-4 py-3"
              >
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                <Badge className="bg-white text-slate-700 hover:bg-white">
                  {item.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

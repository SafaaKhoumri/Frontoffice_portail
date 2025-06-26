import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Home,
  FileText,
  BarChart3,
  Users,
  Package,
  Truck,
  Ship,
  Plane,
  ChevronDown,
  ChevronRight,
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState({});
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications] = useState(3);

  // Données simulées du portail (normalement récupérées via API)
  const [portalData] = useState({
    portalName: "Portail Importateurs",
    portalCode: "IMP001",
    userRole: "Gestionnaire Import",
    userName: "safaa khoumri",
    userEmail: "s.khoumri@example.com",
    menus: [
      {
        id: 'dashboard',
        title: 'Tableau de bord',
        icon: Home,
        path: '/dashboard',
        children: []
      },
      {
        id: 'imports',
        title: 'Gestion Imports',
        icon: Ship,
        children: [
          { id: 'new-import', title: 'Nouvelle Déclaration', icon: FileText, path: '/imports/new' },
          { id: 'import-list', title: 'Mes Déclarations', icon: Package, path: '/imports/list' },
          { id: 'import-tracking', title: 'Suivi Commandes', icon: Truck, path: '/imports/tracking' }
        ]
      },
      {
        id: 'documents',
        title: 'Documents',
        icon: FileText,
        children: [
          { id: 'upload-docs', title: 'Télécharger', icon: FileText, path: '/documents/upload' },
          { id: 'my-docs', title: 'Mes Documents', icon: Package, path: '/documents/list' }
        ]
      },
      {
        id: 'reports',
        title: 'Rapports',
        icon: BarChart3,
        children: [
          { id: 'import-reports', title: 'Rapports Import', icon: TrendingUp, path: '/reports/imports' },
          { id: 'cost-analysis', title: 'Analyse Coûts', icon: BarChart3, path: '/reports/costs' }
        ]
      },
      {
        id: 'profile',
        title: 'Mon Profil',
        icon: User,
        path: '/profile',
        children: []
      }
    ]
  });

  // Données simulées du tableau de bord
  const [dashboardStats] = useState({
    totalImports: 247,
    pendingDeclarations: 12,
    completedThisMonth: 34,
    totalValue: "2,450,000 MAD"
  });

  const [recentActivities] = useState([
    { id: 1, type: 'import', title: 'Déclaration #DEC-2025-001 approuvée', time: '2h', status: 'success' },
    { id: 2, type: 'document', title: 'Facture commerciale téléchargée', time: '4h', status: 'info' },
    { id: 3, type: 'alert', title: 'Document manquant - Certificat origine', time: '6h', status: 'warning' },
    { id: 4, type: 'import', title: 'Nouvelle commande créée #CMD-2025-045', time: '1j', status: 'info' }
  ]);

  // Effet pour charger les données du portail (simulation)
  useEffect(() => {
    // Ici vous pouvez faire appel à votre API pour récupérer les données du portail
    // basé sur le code portail passé en paramètre URL
    console.log('Chargement des données du portail...');
  }, []);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem.id);
    if (menuItem.children && menuItem.children.length > 0) {
      toggleMenu(menuItem.id);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-green-600">+{trend}% ce mois</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'import': return Ship;
        case 'document': return FileText;
        case 'alert': return AlertTriangle;
        default: return Activity;
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'success': return 'text-green-500 bg-green-50';
        case 'warning': return 'text-yellow-500 bg-yellow-50';
        case 'info': return 'text-blue-500 bg-blue-50';
        default: return 'text-gray-500 bg-gray-50';
      }
    };

    const ActivityIcon = getActivityIcon(activity.type);

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
          <ActivityIcon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>Il y a {activity.time}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        {/* Logo et nom du portail */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Ship size={20} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="ml-3">
              <h1 className="font-semibold text-gray-900">{portalData.portalName}</h1>
              <p className="text-xs text-gray-500">{portalData.portalCode}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {portalData.menus.map((menu) => {
            const MenuIcon = menu.icon;
            const hasChildren = menu.children && menu.children.length > 0;
            const isExpanded = expandedMenus[menu.id];
            const isActive = activeMenu === menu.id;

            return (
              <div key={menu.id} className="mb-1">
                <button
                  onClick={() => handleMenuClick(menu)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MenuIcon size={20} />
                  {sidebarOpen && (
                    <>
                      <span className="ml-3 font-medium">{menu.title}</span>
                      {hasChildren && (
                        <div className="ml-auto">
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                      )}
                    </>
                  )}
                </button>

                {/* Sous-menus */}
                {hasChildren && isExpanded && sidebarOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {menu.children.map((submenu) => {
                      const SubmenuIcon = submenu.icon;
                      return (
                        <button
                          key={submenu.id}
                          onClick={() => setActiveMenu(submenu.id)}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                            activeMenu === submenu.id
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <SubmenuIcon size={16} />
                          <span className="ml-3">{submenu.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">Tableau de bord</h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Barre de recherche */}
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Menu utilisateur */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{portalData.userName}</p>
                    <p className="text-xs text-gray-500">{portalData.userRole}</p>
                  </div>
                  <ChevronDown size={16} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User size={16} className="mr-3" />
                      Mon Profil
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings size={16} className="mr-3" />
                      Paramètres
                    </a>
                    <hr className="my-1" />
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut size={16} className="mr-3" />
                      Déconnexion
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-auto p-6">
          {/* Message de bienvenue */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bonjour, {portalData.userName.split(' ')[0]} ! 👋
            </h1>
            <p className="text-gray-600">
              Voici un aperçu de vos activités d'import sur le portail {portalData.portalName}
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Imports"
              value={dashboardStats.totalImports}
              icon={Package}
              color="bg-blue-500"
              trend="12"
            />
            <StatCard
              title="Déclarations en attente"
              value={dashboardStats.pendingDeclarations}
              icon={Clock}
              color="bg-yellow-500"
            />
            <StatCard
              title="Terminées ce mois"
              value={dashboardStats.completedThisMonth}
              icon={TrendingUp}
              color="bg-green-500"
              trend="8"
            />
            <StatCard
              title="Valeur totale"
              value={dashboardStats.totalValue}
              icon={BarChart3}
              color="bg-purple-500"
              trend="15"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activités récentes */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Activités récentes</h3>
                </div>
                <div className="p-3">
                  {recentActivities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Voir toutes les activités →
                  </button>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <FileText size={20} className="text-blue-600 mr-3" />
                      <span className="font-medium text-blue-900">Nouvelle déclaration</span>
                    </div>
                    <ChevronRight size={16} className="text-blue-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <Package size={20} className="text-green-600 mr-3" />
                      <span className="font-medium text-green-900">Suivi commandes</span>
                    </div>
                    <ChevronRight size={16} className="text-green-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <BarChart3 size={20} className="text-purple-600 mr-3" />
                      <span className="font-medium text-purple-900">Générer rapport</span>
                    </div>
                    <ChevronRight size={16} className="text-purple-600" />
                  </button>
                </div>
              </div>

              {/* Informations du portail */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Votre Portail</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Vous êtes connecté en tant que <strong>{portalData.userRole}</strong>
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Code portail:</span>
                    <span className="font-mono">{portalData.portalCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Dernière connexion:</span>
                    <span>Aujourd'hui</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
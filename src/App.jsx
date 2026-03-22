import React, { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from './lib/supabaseClient'

const services = [
  'Toilet Installation & Repair',
  'Sewer Line Repair',
  'Plumbing Design',
  'Drain Cleaning',
  'Water Heating & Cooling',
  'General Plumbing',
  'Other',
]

const faqItems = [
  {
    q: 'What plumbing services do you offer?',
    a: 'We provide pipe installation, leak repair, bathroom fittings, drainage solutions, and maintenance services.',
  },
  {
    q: 'Do you provide emergency plumbing services?',
    a: 'Yes, we offer quick response services for urgent plumbing issues.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We currently serve Songaon, Nashik, and nearby areas.',
  },
  {
    q: 'How can I request a service or product?',
    a: 'You can contact us directly or place an order through the website.',
  },
  {
    q: 'Do you provide installation along with products?',
    a: 'We provide complete installation support for all purchased products.',
  },
]

const products = [
  {
    id: 'pvc-pipe',
    category: 'pipes',
    badge: '3 Sizes',
    image: '/src/assets/pvc_pipes_realistic_1774103165704.png',
    catLabel: 'Pipes',
    name: 'PVC Pipe',
    description:
      'High-quality PVC pipe for standard plumbing applications. Lightweight, corrosion-resistant and durable.',
    sizes: [
      { label: '½ inch', price: 4.99 },
      { label: '¾ inch', price: 6.49 },
      { label: '1 inch', price: 8.99 },
    ],
    unit: '/ meter',
  },
  {
    id: 'cpvc-pipe',
    category: 'pipes',
    badge: '2 Sizes',
    image: '/src/assets/cpvc_pipes_realistic_1774103185554.png',
    catLabel: 'Pipes',
    name: 'CPVC Pipe',
    description: 'Chlorinated PVC pipe ideal for hot and cold water supply lines. Heat and pressure resistant.',
    sizes: [
      { label: '½ inch', price: 6.99 },
      { label: '¾ inch', price: 9.49 },
    ],
    unit: '/ meter',
  },
  {
    id: 'elbow',
    category: 'fittings',
    badge: '2 Sizes',
    image: '/src/assets/pvc_elbow_fitting_1774103246504.png',
    catLabel: 'Fittings & Joints',
    name: 'Elbow Fitting',
    description: '90° elbow joint for changing pipe direction. Compatible with PVC and CPVC pipes.',
    sizes: [
      { label: '½ inch', price: 1.29 },
      { label: '¾ inch', price: 1.79 },
    ],
    unit: '/ piece',
  },
  {
    id: 'tee',
    category: 'fittings',
    badge: '2 Sizes',
    image: '/src/assets/pvc_tee_joint_fitting_1774104341958.png',
    catLabel: 'Fittings & Joints',
    name: 'Tee Joint',
    description: 'T-shaped fitting for splitting or combining pipe flow at 90°. Essential for branching pipelines.',
    sizes: [
      { label: '½ inch', price: 1.49 },
      { label: '¾ inch', price: 1.99 },
    ],
    unit: '/ piece',
  },
  {
    id: 'socket',
    category: 'fittings',
    badge: '2 Sizes',
    image: '/src/assets/pvc_socket_coupler.jpg',
    catLabel: 'Fittings & Joints',
    name: 'Socket / Coupler',
    description:
      'Straight coupling socket for joining two pipes of equal diameter end-to-end. Secure and leak-proof.',
    sizes: [
      { label: '½ inch', price: 0.89 },
      { label: '¾ inch', price: 1.19 },
    ],
    unit: '/ piece',
  },
  {
    id: 'clamp',
    category: 'fittings',
    image: '/src/assets/metal_pipe_clamp_plumbing_1774104361265.png',
    catLabel: 'Fittings & Joints',
    name: 'Pipe Clamp',
    description:
      'Heavy-duty pipe clamps for securing pipes to walls and ceilings. Available in various sizes to suit all pipe diameters.',
    sizes: [
      { label: '½ inch', price: 0.59 },
      { label: '¾ inch', price: 0.75 },
      { label: '1 inch', price: 0.99 },
    ],
    unit: '/ piece',
  },
  {
    id: 'ballvalve',
    category: 'valves',
    badge: '2 Sizes',
    image: '/src/assets/brass_ball_valve_1774103204603.png',
    catLabel: 'Valves & Cocks',
    name: 'Ball Valve',
    description: 'Quarter-turn ball valve for reliable shutoff. Brass body with full bore design for maximum flow rate.',
    sizes: [
      { label: '½ inch', price: 5.99 },
      { label: '¾ inch', price: 7.99 },
    ],
    unit: '/ piece',
  },
  {
    id: 'bib-cock',
    category: 'valves',
    image: '/src/assets/chrome_bib_cock_tap_1774103327474.png',
    catLabel: 'Valves & Cocks',
    name: 'Bib Cock',
    description:
      'Standard wall-mounted bib cock tap for outdoor and utility use. Chrome-plated brass body, long-lasting finish.',
    price: 8.49,
    unit: '/ piece',
  },
  {
    id: 'angle-valve',
    category: 'valves',
    image: '/src/assets/chrome_angle_valve.jpg',
    catLabel: 'Valves & Cocks',
    name: 'Angle Valve',
    description:
      '90° stop valve for isolating supply to toilets, basins and sinks. Standard ½ inch connection, chrome finish.',
    price: 6.99,
    unit: '/ piece',
  },
  {
    id: 'sink-cock',
    category: 'valves',
    image: '/src/assets/chrome_sink_cock_tap_1774103221990.png',
    catLabel: 'Valves & Cocks',
    name: 'Sink Cock',
    description:
      'Pillar-type sink cock for kitchen and utility sinks. Single-handle design, chrome-plated brass construction.',
    price: 12.99,
    unit: '/ piece',
  },
  {
    id: 'wash-basin-trap',
    category: 'fixtures',
    image: '/src/assets/pvc_basin_trap_white_1774103269379.png',
    catLabel: 'Fixtures & Accessories',
    name: 'Wash Basin Trap',
    description:
      'Standard P-trap for wash basins and sinks. Prevents drain odors. Easy-clean design with removable bottle.',
    price: 4.49,
    unit: '/ piece',
  },
  {
    id: 'shower-head',
    category: 'fixtures',
    image: '/src/assets/chrome_shower_head_modern_1774103287057.png',
    catLabel: 'Fixtures & Accessories',
    name: 'Shower Head',
    description:
      'Standard fixed shower head with multiple spray settings. ABS body with chrome finish, universal fitting.',
    price: 18.99,
    unit: '/ piece',
  },
  {
    id: 'teflon-tape',
    category: 'consumables',
    image: '/src/assets/teflon_tape_roll_plumbing_1774103306543.png',
    catLabel: 'Consumables',
    name: 'Teflon Tape (PTFE)',
    description:
      'Standard PTFE thread seal tape for leak-proof threaded connections. 12m roll, works on all pipe types.',
    price: 1.29,
    unit: '/ roll',
  },
]

const defaultSizeState = products.reduce((acc, p) => {
  if (p.sizes) acc[p.id] = p.sizes[0]
  return acc
}, {})

const statTargets = [
  { key: 'experience', label: 'Years of Experience', target: 5, suffix: '+' },
  { key: 'projects', label: 'Projects Completed', target: 50, suffix: '+' },
  { key: 'clients', label: 'Happy Clients', target: 25, suffix: '+' },
  { key: 'support', label: 'Emergency Support', target: 24, suffix: '/7' },
]

function getProductPrice(product, sizeMap) {
  if (product.sizes) {
    const selected = sizeMap[product.id] || product.sizes[0]
    return selected.price
  }
  return product.price || 0
}

function getProductLabel(product, sizeMap) {
  if (product.sizes) {
    const selected = sizeMap[product.id] || product.sizes[0]
    return `${product.name} (${selected.label})`
  }
  return product.name
}

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [isTrackingOpen, setIsTrackingOpen] = useState(false)
  const [trackPhone, setTrackPhone] = useState(() => {
    return window.localStorage.getItem('vatsalya-track-phone') || ''
  })
  const [ordersResult, setOrdersResult] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSizes, setSelectedSizes] = useState(defaultSizeState)
  const [callbackForm, setCallbackForm] = useState(() => {
    if (typeof window === 'undefined') {
      return { name: '', email: '', phone: '', area: '', service: '', message: '' }
    }
    try {
      const saved = window.localStorage.getItem('vatsalya-callback-form')
      if (!saved) return { name: '', email: '', phone: '', area: '', service: '', message: '' }
      return JSON.parse(saved)
    } catch {
      return { name: '', email: '', phone: '', area: '', service: '', message: '' }
    }
  })
  const [view, setView] = useState('main') // 'main' or 'admin-login' or 'admin-dash'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return window.localStorage.getItem('vatsalya-admin-auth') === 'true'
  })
  const [adminTab, setAdminTab] = useState('orders') // 'orders', 'quotes' 
  const [adminLogin, setAdminLogin] = useState({ username: '', password: '' })

  const [adminOrders, setAdminOrders] = useState([])
  const [adminQuotes, setAdminQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSupabaseData = async () => {
    setLoading(true)
    const { data: ords, error: ordErr } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (!ordErr) setAdminOrders(ords || [])

    const { data: qts, error: qtsErr } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (!qtsErr) setAdminQuotes(qts || [])
    setLoading(false)
  }

  const updateOrderStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) showToast('Failed to update: ' + error.message)
    else {
      showToast(`Order #${id} updated to ${newStatus}`)
      fetchSupabaseData()
    }
  }

  const deleteOrder = async (id) => {
    if (!window.confirm(`Are you sure you want to permanently delete Order #${id}?`)) return

    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)

    if (error) showToast('Failed to delete: ' + error.message)
    else {
      showToast(`Order #${id} deleted.`)
      fetchSupabaseData()
    }
  }

  const deleteQuote = async (id) => {
    if (!window.confirm(`Are you sure you want to permanently delete this Lead?`)) return

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)

    if (error) showToast('Failed to delete lead: ' + error.message)
    else {
      showToast('Lead deleted.')
      fetchSupabaseData()
    }
  }

  useEffect(() => {
    if (view === 'admin-dash') {
      fetchSupabaseData()
    }
  }, [view, adminTab])

  const [checkoutStep, setCheckoutStep] = useState('cart') // 'cart' or 'checkout'
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', payment: 'Cash on Delivery' })
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [stats, setStats] = useState(
    statTargets.reduce((acc, item) => {
      acc[item.key] = 0
      return acc
    }, {}),
  )

  useEffect(() => {
    // Intelligent Intersection Observer for Scroll Highlighting
    const options = { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          if (id === 'home-section') setActiveSection('home')
          if (id === 'about-section') setActiveSection('about')
          if (id === 'services-section') setActiveSection('services')
          if (id === 'faq-section') setActiveSection('faq')
          if (id === 'contact-section') setActiveSection('contact')
        }
      })
    }, options)

    const sections = ['home-section', 'about-section', 'services-section', 'faq-section', 'contact-section']
    sections.forEach(s => {
      const el = document.getElementById(s)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [activePage])

  useEffect(() => {
    // Intelligent Intersection Observer for Scroll Highlighting
    const options = { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          if (id === 'home-section') setActiveSection('home')
          if (id === 'about-section') setActiveSection('about')
          if (id === 'services-section') setActiveSection('services')
          if (id === 'faq-section') setActiveSection('faq')
          if (id === 'contact-section') setActiveSection('contact')
        }
      })
    }, options)

    const sections = ['home-section', 'about-section', 'services-section', 'faq-section', 'contact-section']
    sections.forEach(s => {
      const el = document.getElementById(s)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [activePage])

  // Auto-Search Tracking History when opened
  useEffect(() => {
    if (isTrackingOpen && trackPhone) {
      handleTrackOrders()
    }
  }, [isTrackingOpen])

  const statsRef = useRef(null)
  const toastTimerRef = useRef(null)
  const counterStartedRef = useRef(false)

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash
      if (h === '#admin') {
        if (isAdminLoggedIn) setView('admin-dash')
        else setView('admin-login')
      } else if (h === '#home') {
        setView('main')
      }
    }
    window.addEventListener('hashchange', handleHash)
    handleHash() // Initial check

    // Set Initial Default View (Always start at Home unless specifically asked for Admin)
    if (window.location.hash !== '#admin') {
      setView('main')
      setActivePage('home')
      window.scrollTo(0, 0)
    }

    return () => {
      window.removeEventListener('hashchange', handleHash)
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [isAdminLoggedIn])

  useEffect(() => {
    window.localStorage.setItem('vatsalya-admin-auth', isAdminLoggedIn)
  }, [isAdminLoggedIn])

  useEffect(() => {
    window.localStorage.setItem('vatsalya-callback-form', JSON.stringify(callbackForm))
  }, [callbackForm])

  useEffect(() => {
    const node = statsRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || counterStartedRef.current) return
        counterStartedRef.current = true

        const duration = 1800
        const start = performance.now()

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          setStats(() => {
            const next = {}
            statTargets.forEach((item) => {
              next[item.key] = Math.floor(item.target * progress)
            })
            return next
          })
          if (progress < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const cartSummary = useMemo(() => {
    const total = cart.reduce((sum, item) => sum + item.total, 0)
    const count = cart.reduce((sum, item) => sum + item.qty, 0)
    return { total, count }
  }, [cart])

  const visibleProducts = useMemo(() => {
    let base = products
    if (filter !== 'all') {
      base = products.filter((item) => item.category === filter)
    }
    if (!searchTerm) return base
    const query = searchTerm.toLowerCase()
    return base.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
    )
  }, [filter, searchTerm])

  const showToast = (message) => {
    setToast(`✓ ${message}`)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(''), 2200)
  }

  const addToCart = (product) => {
    const label = getProductLabel(product, selectedSizes)
    const price = getProductPrice(product, selectedSizes)

    setCart((prev) => {
      const found = prev.find((item) => item.label === label)
      if (found) {
        return prev.map((item) =>
          item.label === label ? { ...item, qty: item.qty + 1, total: item.total + price } : item,
        )
      }
      return [...prev, { label, price, qty: 1, total: price }]
    })

    showToast(`Added: ${label}`)
  }

  const updateQty = (label, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.label === label) {
            const nextQty = Math.max(0, item.qty + delta)
            return { ...item, qty: nextQty, total: nextQty * item.price }
          }
          return item
        })
        .filter((item) => item.qty > 0),
    )
  }

  const removeItem = (label) => {
    setCart((prev) => prev.filter((item) => item.label !== label))
  }

  const clearCart = () => {
    setCart([])
    setShowCartModal(false)
  }

  const showPage = (page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTrackOrders = async (e) => {
    if (e) e.preventDefault()
    if (!trackPhone) return
    setIsFetching(true)

    // Consistency check for phone numbers
    const cleanPhone = trackPhone.trim().replace(/\s+/g, '')
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('phone', cleanPhone)
      .order('created_at', { ascending: false })

    if (error) {
      showToast('Error syncing orders: ' + error.message)
      setOrdersResult([])
    } else {
      setOrdersResult(data || [])
      window.localStorage.setItem('vatsalya-track-phone', cleanPhone)
    }
    setIsFetching(false)
  }

  const clearTrackHistory = () => {
    setTrackPhone('')
    setOrdersResult(null)
    window.localStorage.removeItem('vatsalya-track-phone')
    showToast('Search history cleared.')
  }

  const scrollToSection = (id) => {
    if (activePage !== 'home') {
      setActivePage('home')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
      return
    }

    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Secure Auth Guard for Admin Dashboard
  if (view === 'admin-dash') {
    if (!isAdminLoggedIn) {
      setView('admin-login')
      return null
    }

    return (
      <div className="admin-modern-layout">
        <header className="admin-navbar">
          <div className="admin-nav-corner-flex">
            <div className="admin-brand">VAT<span>SALYA</span> ADMIN</div>
            <div className="admin-user">
              <span>Welcome, <strong>Amol</strong> 👋</span>
              <button className="btn-logout" onClick={() => {
                setIsAdminLoggedIn(false)
                window.history.replaceState(null, null, ' ')
                setView('main')
                showToast('Logged out successfully.')
              }}>Logout 🚪</button>
            </div>
          </div>
        </header>

        <main className="container admin-container">
          <div className="admin-controls">
            <div className="tab-group">
              <button className={adminTab === 'orders' ? 'active' : ''} onClick={() => setAdminTab('orders')}>
                🛒 Product Orders
              </button>
              <button className={adminTab === 'quotes' ? 'active' : ''} onClick={() => setAdminTab('quotes')}>
                📋 Quote Requests
              </button>
            </div>
          </div>

          <div className="admin-view-content">
            {loading ? (
              <div className="loading-view">
                <div className="spinner"></div>
                <p>Syncing with Supabase...</p>
              </div>
            ) : adminTab === 'orders' ? (
              <div className="orders-hub">
                <header className="hub-header">
                  <h3>Master Order Registry</h3>
                  <p>Monitoring {adminOrders.length} active customer orders.</p>
                </header>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Purchased Items</th>
                        <th>Total</th>
                        <th>Update Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminOrders.map(order => (
                        <tr key={order.id}>
                          <td><strong>ORD-{order.id.toString().slice(-4).toUpperCase()}</strong></td>
                          <td>
                            <div>{order.customer}</div>
                            <div className="td-phone">{order.phone}</div>
                          </td>
                          <td className="td-items">{order.items}</td>
                          <td><strong>${Number(order.total).toFixed(2)}</strong></td>
                          <td>
                            <select
                              className={`status-select ${order.status.toLowerCase()}`}
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="admin-actions-cell">
                            <a
                              href={`https://wa.me/91${order.phone}?text=Hello ${order.customer}, we received your plumbing order on Vatsalya.`}
                              target="_blank"
                              rel="noreferrer"
                              className="wa-btn"
                            >
                              WhatsApp 💬
                            </a>
                            <button className="delete-btn" onClick={() => deleteOrder(order.id)}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {adminOrders.length === 0 && <div className="empty-state">No data available from database.</div>}
                </div>
              </div>
            ) : (
              <div className="quotes-hub">
                <header className="hub-header">
                  <h3>Quote Inquiry Hub</h3>
                  <p>Customer leads seeking professional plumbing estimates.</p>
                </header>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer Lead</th>
                        <th>Location</th>
                        <th>Service Type</th>
                        <th>Inquiry Message</th>
                        <th>Actions Hub</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminQuotes.map(q => (
                        <tr key={q.id}>
                          <td>
                            <div><strong>{q.name}</strong></div>
                            <div className="td-phone">{q.phone}</div>
                          </td>
                          <td>{q.area}</td>
                          <td><span className="service-tag">{q.service}</span></td>
                          <td className="td-msg">{q.msg}</td>
                          <td className="admin-actions-cell">
                            <a
                              href={`https://wa.me/91${q.phone}?text=Hello ${q.name}, replying to your plumbing quote request for ${q.service}.`}
                              target="_blank"
                              rel="noreferrer"
                              className="wa-btn secondary"
                            >
                              Reply 📱
                            </a>
                            <button className="delete-btn" onClick={() => deleteQuote(q.id)}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {adminQuotes.length === 0 && <div className="empty-state">No inquiries yet from database.</div>}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  if (view === 'admin-login') {
    return (
      <div className="admin-login-layout">
        <div className="login-box">
          <div className="login-header">
            <h3>VAT<span>SALYA</span> ADMIN</h3>
            <p>Please enter your credentials to access the business hub.</p>
          </div>
          <form
            className="login-form-body"
            onSubmit={(e) => {
              e.preventDefault()
              if (adminLogin.username === import.meta.env.VITE_ADMIN_USERNAME && adminLogin.password === import.meta.env.VITE_ADMIN_PASSWORD) {
                showToast('Welcome back, Admin!')
                setIsAdminLoggedIn(true)
                setView('admin-dash')
              } else {
                showToast('Oops! Incorrect username or password.')
              }
            }}
          >
            <div className="login-field">
              <label>Username</label>
              <input
                type="text"
                required
                value={adminLogin.username}
                onChange={(e) => setAdminLogin({ ...adminLogin, username: e.target.value })}
                placeholder="Manager Name"
              />
            </div>
            <div className="login-field">
              <label>Password</label>
              <input
                type="password"
                required
                value={adminLogin.password}
                onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login Now 🔒</button>
            <button type="button" className="btn-back-home" onClick={() => {
              window.history.replaceState(null, null, ' ')
              setView('main')
            }}>← Return to Website</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <header>
        <div className="nav-wrap fluid-header">
          <button className="logo" onClick={() => showPage('home')}>
            VAT<span>SALYA</span>
          </button>
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={menuOpen ? 'nav-open' : ''}>
            <ul onClick={() => setMenuOpen(false)}>
              <li>
                <button
                  className={activeSection === 'home' && activePage === 'home' ? 'nav-active' : ''}
                  onClick={() => {
                    showPage('home')
                    setActiveSection('home')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'about' ? 'nav-active' : ''}
                  onClick={() => { scrollToSection('about-section'); setActiveSection('about'); }}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'services' ? 'nav-active' : ''}
                  onClick={() => { scrollToSection('services-section'); setActiveSection('services'); }}
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  className={activePage === 'shop' ? 'nav-active' : ''}
                  onClick={() => showPage('shop')}
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  className={activeSection === 'contact' ? 'nav-active' : ''}
                  onClick={() => { scrollToSection('contact-section'); setActiveSection('contact'); }}
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  className="nav-btn-alt" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTrackingOpen(true);
                  }}
                >
                  📋 My Orders
                </button>
              </li>
              <li>
                <button className="cart-badge" onClick={() => setShowCartModal(true)}>
                  🛒 <span className="cart-count">{cartSummary.count}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className={`page-section ${activePage === 'home' ? 'active-page' : ''}`}>
        <section className="hero">
          <div className="container">
            <div id="home-section" className="hero-content">
              <p className="hero-tag">Professional Plumbing Services in Nashik</p>
              <h1>Vatsalya Plumbing Services</h1>
              <p className="hero-desc">
                Built on trust, powered by expertise—Vatsalya Plumbing Services is dedicated to delivering flawless
                plumbing work with unmatched consistency and care.
              </p>


            </div>
          </div>
        </section>



        <section id="about-section" className="about-section">
          <div className="container">
            <div className="about-grid">
              <div className="about-img">
                <img
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80"
                  alt="Plumber at work"
                />
                <div className="about-badge">
                  <div className="num">5+</div>
                  <div className="label">Years Experience</div>
                </div>
              </div>
              <div className="about-text">
                <span className="section-tag">About Us</span>
                <h2>Plumbing is What We Do</h2>
                <p>
                  We are a leading plumbing service provider with over 5 years of experience in the business. We provide
                  a wide range of reliable services for both residential and commercial clients in and around Nashik.
                </p>
                <p>
                  No job is too big or too small, we&apos;ve got you covered. In addition to our services, you can check
                  out our shop for a wide range of plumbing supplies and equipment. When it comes to plumbing we are
                  your one stop shop.
                </p>
                <ul className="check-list">
                  <li>Qualified & Trained Team</li>
                  <li>Affordable & Transparent Pricing</li>
                  <li>24/7 Emergency Support</li>
                  <li>Quick and Efficient Services</li>
                  <li>50+ Happy Clients</li>
                  <li>Plumbing Experts in Nashik</li>
                </ul>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        <div ref={statsRef} className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              {statTargets.map((item) => (
                <div key={item.key}>
                  <span className="stat-num">
                    {stats[item.key]}
                    {item.suffix}
                  </span>
                  <span className="stat-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="why-strip">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Get Your Project Done</span>
              <h2>We Specialize in Residential &amp; Commercial Projects</h2>
            </div>
            <div className="why-grid">
              <div className="why-card">
                <div className="why-icon">🔧</div>
                <h4>Fast and Efficient Service</h4>
                <p>
                  With a work rate second to none we ensure a quick turnover on all projects whether big or small.
                </p>
              </div>
              <div className="why-card">
                <div className="why-icon">🏆</div>
                <h4>Highly Trained Team</h4>
                <p>
                  Our team of plumbers are all certified and have many years of experience in both residential and
                  commercial jobs.
                </p>
              </div>
              <div className="why-card">
                <div className="why-icon">💰</div>
                <h4>Most Affordable Rates</h4>
                <p>
                  We offer very competitive rates and affordable service bundles for residential and commercial clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services-section" className="services-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Services</span>
              <h2>Quality Service is Our Guarantee</h2>
              <p>
                We offer a wide range of plumbing services catered to both residential and commercial clients.
              </p>
            </div>
            <div className="services-grid">
              {[
                {
                  title: 'Toilet Installation & Repair',
                  text: 'Professional toilet installation and maintenance for both residential and commercial projects.',
                  img: '/src/assets/toilet_repair_service_1774103637200.png',
                },
                {
                  title: 'Sewer Line Repair',
                  text: 'Efficient and reliable sewer line repair and clog removal by our expert team.',
                  img: '/src/assets/sewer_line_repair_service_1774103658037.png',
                },
                {
                  title: 'Plumbing Design',
                  text: 'Expert plumbing architecture and blueprint design for bathrooms and kitchens.',
                  img: '/src/assets/plumbing_design_service_1774103680865.png',
                },
                {
                  title: 'Drain Cleaning',
                  text: 'Fast and professional drain cleaning to keep your plumbing systems working seamlessly.',
                  img: '/src/assets/drain_cleaning_service_1774103704438.png',
                },
                {
                  title: 'Water Heating & Cooling',
                  text: 'Specialized installation and repair of modern heating and water management systems.',
                  img: '/src/assets/water_heating_service_1774103725235.png',
                },
                {
                  title: 'General Plumbing',
                  text: 'Wide-ranging plumbing support for faucets, pipes, and all general plumbing requirements.',
                  img: '/src/assets/general_plumbing_service_main_1774103753494.png',
                },
              ].map((service) => (
                <div key={service.title} className="service-card h-full flex flex-col">
                  <img src={service.img} alt={service.title} loading="lazy" />
                  <div className="service-body flex-1">
                    <h5>{service.title}</h5>
                    <p>{service.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="services-contact-info">
              <div className="contact-item">
                <span className="icon">📞</span>
                <strong>Phone:</strong> <a href="tel:+919096899364">+91 9096899364</a>
              </div>
              <div className="contact-item">
                <span className="icon">📍</span>
                <strong>Address:</strong> Songaon, Nashik, Maharashtra
              </div>
            </div>
          </div>
        </section>



        <section className="testimonials">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Testimonials</span>
              <h2>What Our Clients Say</h2>
              <p>We take pride in our work and strive to ensure guaranteed satisfaction.</p>
            </div>
            <div className="testi-grid">
              {[
                {
                  quote:
                    'Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.',
                  name: 'Leia Hurst',
                  initial: 'L',
                },
                {
                  quote:
                    'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque.',
                  name: 'Justine Dean',
                  initial: 'J',
                },
                {
                  quote:
                    'Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum.',
                  name: 'Willis Presley',
                  initial: 'W',
                },
              ].map((testimonial) => (
                <div key={testimonial.name} className="testi-card">
                  <p>{testimonial.quote}</p>
                  <div className="testi-author">
                    <div className="testi-avatar">{testimonial.initial}</div>
                    <div>
                      <h6>{testimonial.name}</h6>
                      <span>Happy Client</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq-section" className="faq-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">FAQs</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-wrap">
              {faqItems.map((faq, idx) => {
                const open = openFaq === idx
                return (
                  <div key={faq.q} className={`faq-item ${open ? 'open' : ''}`}>
                    <button className="faq-question" onClick={() => setOpenFaq(open ? -1 : idx)}>
                      {faq.q} <span className="arrow">▼</span>
                    </button>
                    <div className="faq-answer">{faq.a}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

      </div>

      <div className={`page-section ${activePage === 'shop' ? 'active-page' : ''}`}>
        <section className="shop-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Store</span>
              <h2>Plumbing Supplies &amp; Materials</h2>
              <p>
                Quality plumbing materials for residential and commercial projects. Select your size and add to cart.
              </p>
            </div>

            <div className="shop-controls">
              <div className="shop-filter-bar">
                {[
                  { label: 'All Products', value: 'all' },
                  { label: 'Pipes', value: 'pipes' },
                  { label: 'Fittings & Joints', value: 'fittings' },
                  { label: 'Valves & Cocks', value: 'valves' },
                  { label: 'Fixtures', value: 'fixtures' },
                  { label: 'Consumables', value: 'consumables' },
                ].map((item) => (
                  <button
                    key={item.value}
                    className={`filter-btn ${filter === item.value ? 'active' : ''}`}
                    onClick={() => setFilter(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="shop-search">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>

            <div className="shop-grid" id="shopGrid">
              {visibleProducts.map((product) => {
                const selected = product.sizes ? selectedSizes[product.id] || product.sizes[0] : null
                const price = selected ? selected.price : product.price
                return (
                  <div key={product.id} className="product-card fade-in">
                    {product.badge ? <div className="product-badge">{product.badge}</div> : null}
                    <div className="product-img-wrap">
                      <img src={product.image} alt={product.name} loading="lazy" />
                    </div>
                    <div className="product-info">
                      <div className="product-cat">{product.catLabel}</div>
                      <h5>{product.name}</h5>
                      <p>{product.description}</p>

                      {product.sizes ? (
                        <div className="size-chips">
                          {product.sizes.map((size) => (
                            <button
                              key={size.label}
                              className={`size-chip ${selected?.label === size.label ? 'selected' : ''}`}
                              onClick={() =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [product.id]: size,
                                }))
                              }
                            >
                              {size.label}
                            </button>
                          ))}
                        </div>
                      ) : null}

                      <div className="product-footer">
                        <div className="product-price">
                          ${price.toFixed(2)} <span>{product.unit}</span>
                        </div>
                        <button className="btn-cart" onClick={() => addToCart(product)}>
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>


          </div>
        </section>
      </div>

      <section className="cta-band">
        <div className="container">
          <h2>Need Fast and Reliable Plumbing Service?</h2>
          <p>We offer a wide range of plumbing services catered to both residential and commercial clients.</p>
          <div className="cta-actions">
            <a href="tel:+919096899364" className="btn btn-orange">
              ☎ Emergency Call
            </a>

          </div>
        </div>
      </section>

      <section id="quote-section" className="quote-form-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Estimate</span>
            <h2>Get Free Quote</h2>
            <p>Ready to start your plumbing project? Fill out the form below and our experts will contact you with a transparent quote.</p>
          </div>
          <div className="quote-form-container">
            <form
              className="pro-quote-form"
              onSubmit={async (e) => {
                e.preventDefault()
                const { error } = await supabase.from('leads').insert([{
                  name: callbackForm.name,
                  phone: callbackForm.phone,
                  area: callbackForm.area,
                  service: callbackForm.service,
                  msg: callbackForm.message
                }])

                if (error) {
                  showToast('Error sending request: ' + error.message)
                } else {
                  showToast('Quote Request Received! We will contact you soon.')
                  setCallbackForm({ name: '', email: '', phone: '', area: '', service: '', message: '' })
                }
              }}
            >
              <div className="form-group-row">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={callbackForm.name}
                  onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number (Required)"
                  value={callbackForm.phone}
                  onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                  required
                />
              </div>
              <div className="form-group-row">
                <input
                  type="text"
                  placeholder="Area in Nashik (e.g. Songaon)"
                  value={callbackForm.area}
                  onChange={(e) => setCallbackForm({ ...callbackForm, area: e.target.value })}
                />
                <select
                  value={callbackForm.service}
                  onChange={(e) => setCallbackForm({ ...callbackForm, service: e.target.value })}
                >
                  <option value="">Select Service Needed</option>
                  {[
                    'Toilet Installation & Repair',
                    'Sewer Line Repair',
                    'Plumbing Design',
                    'Drain Cleaning',
                    'Water Heating & Cooling',
                    'General Plumbing'
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Briefly describe your requirements or issues..."
                rows="4"
                value={callbackForm.message}
                onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
              ></textarea>
              <button type="submit" className="btn btn-primary btn-block">
                Get My Free Quote 🚀
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer id="contact-section">
        <div className="footer-top">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col">
                <div className="footer-logo">
                  VAT<span>SALYA</span>
                </div>
                <p>
                  We are a dedicated plumbing service provider with over 5 years of experience serving residential
                  and commercial clients in Nashik and nearby areas.
                </p>
                <div className="footer-contact">
                  <div>📍 Songaon, Nashik, Maharashtra</div>
                  <div>
                    📞 <a href="tel:+919096899364">+91 9096899364</a>
                  </div>
                  <div>
                    ✉ <a href="mailto:info@vatsalyaplumbing.com">info@vatsalyaplumbing.com</a>
                  </div>
                  <div>🕐 Mon-Sat 9:00-18:00 | Sunday CLOSED</div>
                </div>
              </div>
              <div className="footer-col">
                <h4>Our Services</h4>
                <ul>
                  {services.slice(0, 6).map((service) => (
                    <li key={service}>
                      <a href="#">{service}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  {['Home', 'About Us', 'Services', 'FAQs', 'Testimonials', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-col">
                <h4>Contact Us</h4>
                <p>Have a plumbing emergency? Contact us immediately for fast and reliable support.</p>
                <br />
                <a href="tel:+919096899364" className="btn btn-orange footer-call-btn">
                  ☎ Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">Copyright © Vatsalya Plumbing Services. All Rights Reserved.</div>
        </div>
      </footer>



      {toast ? <div id="toast">{toast}</div> : null}

      {showCartModal && (
        <div className="modal-overlay" onClick={() => setShowCartModal(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{checkoutStep === 'cart' ? 'Your Shopping Cart' : 'Shipping Information'}</h2>
              <button className="close-modal" onClick={() => {
                setShowCartModal(false)
                setCheckoutStep('cart')
              }}>×</button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart-view">
                <div className="empty-icon">🛒</div>
                <p>Your cart is empty.</p>
                <button className="btn btn-primary" onClick={() => {
                  setShowCartModal(false)
                  showPage('shop')
                }}>Go Shopping</button>
              </div>
            ) : checkoutStep === 'cart' ? (
              <>
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.label} className="cart-item-row">
                      <div className="item-details">
                        <h6>{item.label}</h6>
                        <span>${item.price.toFixed(2)} / unit</span>
                      </div>
                      <div className="item-controls">
                        <div className="qty-picker">
                          <button onClick={() => updateQty(item.label, -1)}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.label, 1)}>+</button>
                        </div>
                        <div className="item-total-price">
                          ${item.total.toFixed(2)}
                        </div>
                        <button className="btn-remove" onClick={() => removeItem(item.label)}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <div className="total-row">
                    <span>Total Amount:</span>
                    <span className="final-price">${cartSummary.total.toFixed(2)}</span>
                  </div>
                  <div className="modal-buttons">
                    <button className="btn btn-danger-outline" onClick={clearCart}>Clear Cart</button>
                    <button className="btn btn-orange" onClick={() => setCheckoutStep('checkout')}>Next: Shipping Details →</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="checkout-step-view">
                <p className="step-hint">Enter your details for delivery. We will contact you to confirm.</p>
                <form
                  className="checkout-form"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const { error } = await supabase.from('orders').insert([{
                      customer: customerInfo.name,
                      items: cart.map(i => `${i.label} x${i.qty}`).join(', '),
                      total: cartSummary.total,
                      payment: customerInfo.payment,
                      status: 'Pending',
                      address: customerInfo.address,
                      phone: customerInfo.phone
                    }])

                    if (error) {
                      showToast('Checkout failed: ' + error.message)
                    } else {
                      showToast('Processing local order...')
                      setTimeout(() => {
                        setCart([])
                        setShowCartModal(false)
                        setCheckoutStep('cart')
                        setCustomerInfo({ name: '', phone: '', address: '', payment: 'Cash on Delivery' })
                        showToast('Order Placed Successfully!')
                      }, 2000)
                    }
                  }}
                >
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Number (Required)</label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label>Complete Delivery Address</label>
                    <textarea
                      required
                      rows="3"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="Area, Street, House/Shop No."
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Preferred Payment Method</label>
                    <select
                      value={customerInfo.payment}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, payment: e.target.value })}
                    >
                      <option>Cash on Delivery</option>
                      <option>UPI / Online (On Delivery)</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>

                  <div className="modal-footer no-padding-sides">
                    <div className="total-row mini-total">
                      <span>Grand Total:</span>
                      <span className="final-price">${cartSummary.total.toFixed(2)}</span>
                    </div>
                    <div className="modal-buttons">
                      <button type="button" className="btn btn-outline" onClick={() => setCheckoutStep('cart')}>← Back</button>
                      <button type="submit" className="btn btn-orange">Confirm & Place Order ✅</button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Tracking Modal */}
      {isTrackingOpen && (
        <div className="modal-overlay">
          <div className="cart-modal track-modal">
            <div className="modal-header">
              <h3>Track Your Orders 🛰️</h3>
              <button
                className="close-btn"
                onClick={() => {
                  setIsTrackingOpen(false)
                  setOrdersResult(null)
                  setTrackPhone('')
                }}
              >✕</button>
            </div>

            <div className="modal-body p-40">
              <p className="track-desc">Enter the **Phone Number** you used at checkout to see your order history and status.</p>

              <form onSubmit={handleTrackOrders} className="track-form">
                <div className="track-input-wrap">
                  <input
                    type="tel"
                    placeholder="Enter phone number..."
                    value={trackPhone}
                    onChange={(e) => setTrackPhone(e.target.value)}
                    required
                  />
                  {trackPhone && (
                    <button type="button" className="clear-lookup" onClick={clearTrackHistory}>✕</button>
                  )}
                </div>
                <button type="submit" className="btn btn-primary" disabled={isFetching}>
                  {isFetching ? 'Checking...' : 'Track My Orders'}
                </button>
              </form>

              <div className="track-results">
                {ordersResult === null ? (
                  <div className="track-empty-state">
                    <div className="icon">🔍</div>
                    <p>Enter your number to begin.</p>
                  </div>
                ) : ordersResult.length === 0 ? (
                  <div className="track-empty-state">
                    <div className="icon">🛑</div>
                    <p>Oops! No orders found for this number.</p>
                  </div>
                ) : (
                  <div className="results-list">
                    {ordersResult.map(order => (
                      <div key={order.id} className="track-card">
                        <div className="track-card-header">
                          <span className="track-id">ORD-{order.id.toString().slice(-4).toUpperCase()}</span>
                          <span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span>
                        </div>
                        <div className="track-items">{order.items}</div>
                        <div className="track-footer">
                          <div className="track-info-group">
                            <span className="track-total">Total: ${Number(order.total).toFixed(2)}</span>
                            <span className="track-date">{new Date(order.created_at).toLocaleDateString()}</span>
                          </div>
                          <a
                            href={`https://wa.me/919096899364?text=${encodeURIComponent(`Hi Vatsalya! Checking on Order ORD-${order.id.toString().slice(-4)} (${order.items.slice(0, 30)}...)`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-track-contact"
                          >
                            Support 💬
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

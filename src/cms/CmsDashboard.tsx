import { useState, useEffect } from 'react';
import { api } from './api';
import { Building, FileText, Tags, Package, LogOut } from 'lucide-react';


// ─── Brown Design Tokens ─────────────────────
const C = {
    brown900: '#1c0f06',
    brown800: '#2e1508',
    brown700: '#4a2e1a',
    brown600: '#6b3f22',
    brown500: '#8c5430',
    brown400: '#b8712a',
    brown300: '#d4955a',
    brown200: '#e8c4a0',
    brown100: '#f5e6d8',
    brown50: '#fdf9f6',
    white: '#ffffff',
    grey50: '#f8f7f6',
    grey100: '#f0ece8',
    grey200: '#e2d9d0',
    grey500: '#8a7060',
    grey700: '#4a3828',
    grey900: '#1c0f06',
};

// ─── Style helpers ────────────────────────────
const S = {
    card: {
        background: C.white,
        borderRadius: '14px',
        border: `1px solid ${C.grey200}`,
        boxShadow: '0 1px 4px rgba(60,25,10,.07)',
        overflow: 'hidden' as const,
        marginBottom: '20px',
    },
    cardHeader: {
        padding: '16px 22px',
        borderBottom: `1px solid ${C.grey100}`,
        display: 'flex' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        background: C.brown50,
    },
    cardTitle: { margin: 0, fontSize: '15px', fontWeight: 600, color: C.brown700 },
    cardBody: { padding: '20px 22px' },
    input: {
        width: '100%', boxSizing: 'border-box' as const,
        padding: '9px 12px',
        border: `1.5px solid ${C.grey200}`,
        borderRadius: '8px',
        fontSize: '13.5px',
        fontFamily: "'Inter', sans-serif",
        color: C.grey900,
        outline: 'none',
        marginBottom: '12px',
        background: C.brown50,
    },
    label: {
        display: 'block' as const,
        fontSize: '11.5px', fontWeight: 600,
        color: C.brown600,
        marginBottom: '5px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
    },
    btnBrown: {
        background: `linear-gradient(135deg, ${C.brown800}, ${C.brown400})`,
        color: C.white, border: 'none', borderRadius: '8px',
        padding: '8px 18px', fontSize: '13px', fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit',
        boxShadow: `0 2px 10px rgba(122,69,34,.28)`,
        transition: 'all .2s',
    },
    btnOutline: {
        background: 'transparent', color: C.brown500,
        border: `1.5px solid ${C.brown300}`, borderRadius: '8px',
        padding: '7px 14px', fontSize: '13px', fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit',
    },
    btnRed: {
        background: 'transparent', color: '#c0392b',
        border: '1.5px solid #e57373', borderRadius: '8px',
        padding: '7px 14px', fontSize: '13px', fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit',
    },
    badge: (warm: boolean) => ({
        display: 'inline-block' as const,
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '11.5px',
        fontWeight: 600,
        background: warm ? C.brown100 : C.grey100,
        color: warm ? C.brown700 : C.grey700,
    }),
};

// ─── Toast ────────────────────────────────────
function Toast({ msg, type, onClose }: { msg: string; type: 'success' | 'error'; onClose: () => void }) {
    useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
    return (
        <div style={{
            position: 'fixed', top: '80px', right: '24px', zIndex: 9999,
            background: type === 'success' ? C.brown700 : '#c0392b',
            color: C.white, borderRadius: '10px', padding: '12px 20px',
            fontSize: '13.5px', fontWeight: 500,
            boxShadow: '0 8px 24px rgba(0,0,0,.18)',
        }}>
            {type === 'success' ? '✓ ' : '✕ '}{msg}
        </div>
    );
}

// ─── COMPANY INFO TAB ─────────────────────────
function CompanyInfoTab() {
    const [info, setInfo] = useState<any>(null);
    const [form, setForm] = useState<any>({});
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        api.getCompanyInfo().then(res => {
            if (res.data.length > 0) { setInfo(res.data[0]); setForm(res.data[0]); }
        });
    }, []);

    const save = async () => {
        if (!info) return;
        setSaving(true);
        try {
            await api.updateCompanyInfo(info.id, form);
            setToast({ msg: 'Company info updated successfully!', type: 'success' });
        } catch { setToast({ msg: 'Failed to save changes.', type: 'error' }); }
        finally { setSaving(false); }
    };

    const field = (key: string, label: string, type = 'text') => (
        <div key={key}>
            <label style={S.label}>{label}</label>
            <input style={S.input} type={type} value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} />
        </div>
    );

    if (!info) return <p style={{ color: C.grey500, padding: '20px' }}>Loading…</p>;
    return (
        <div>
            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
            <div style={S.card}>
                <div style={S.cardHeader}>
                    <h3 style={{ ...S.cardTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Building size={18} /> Company Details
                    </h3>
                    <button style={S.btnBrown} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
                </div>
                <div style={{ ...S.cardBody, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    {field('name', 'Company Short Name')}
                    {field('full_name', 'Full Legal Name')}
                    {field('email', 'Email Address', 'email')}
                    {field('phone', 'Phone Number')}
                    {field('founded_year', 'Founded Year')}
                    {field('founder', 'Founder Name')}
                    {field('employees_count', 'Total Employees', 'number')}
                    {field('branches_count', 'Branches Count', 'number')}
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={S.label}>Address</label>
                        <textarea value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })}
                            rows={2} style={{ ...S.input, resize: 'vertical' }} />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={S.label}>Tagline</label>
                        <input style={S.input} value={form.tagline || ''} onChange={e => setForm({ ...form, tagline: e.target.value })} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── ABOUT TAB ────────────────────────────────
function AboutTab() {
    const [paragraphs, setParagraphs] = useState<any[]>([]);
    const [newText, setNewText] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    const load = () => api.getAboutParagraphs().then(r => setParagraphs(r.data));
    useEffect(() => { load(); }, []);

    const add = async () => {
        if (!newText.trim()) return;
        try {
            await api.createAboutParagraph({ text: newText, order: paragraphs.length });
            setNewText(''); load();
            setToast({ msg: 'Paragraph added!', type: 'success' });
        } catch { setToast({ msg: 'Failed to add paragraph.', type: 'error' }); }
    };

    const save = async (id: number) => {
        try {
            await api.updateAboutParagraph(id, { text: editText });
            setEditId(null); load();
            setToast({ msg: 'Paragraph updated!', type: 'success' });
        } catch { setToast({ msg: 'Failed to update.', type: 'error' }); }
    };

    const del = async (id: number) => {
        if (!confirm('Delete this paragraph?')) return;
        try { await api.deleteAboutParagraph(id); load(); setToast({ msg: 'Deleted.', type: 'success' }); }
        catch { setToast({ msg: 'Failed to delete.', type: 'error' }); }
    };

    return (
        <div>
            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
            <div style={S.card}>
                <div style={S.cardHeader}>
                    <h3 style={{ ...S.cardTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={18} /> About Paragraphs
                    </h3>
                    <span style={S.badge(true)}>{paragraphs.length} paragraphs</span>
                </div>
                <div style={S.cardBody}>
                    {paragraphs.map((p, i) => (
                        <div key={p.id} style={{ border: `1.5px solid ${C.grey200}`, borderRadius: '10px', padding: '14px 16px', marginBottom: '12px', background: C.brown50 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                                <span style={S.badge(true)}>#{i + 1}</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button style={S.btnOutline} onClick={() => { setEditId(p.id); setEditText(p.text); }}>Edit</button>
                                    <button style={S.btnRed} onClick={() => del(p.id)}>Delete</button>
                                </div>
                            </div>
                            {editId === p.id ? (
                                <div>
                                    <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={4}
                                        style={{ ...S.input, marginBottom: '10px', resize: 'vertical' }} />
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={S.btnBrown} onClick={() => save(p.id)}>Save</button>
                                        <button style={S.btnOutline} onClick={() => setEditId(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ margin: 0, color: C.grey700, fontSize: '13.5px', lineHeight: 1.65 }}>{p.text}</p>
                            )}
                        </div>
                    ))}
                    <div style={{ borderTop: `1px solid ${C.grey200}`, paddingTop: '18px', marginTop: '8px' }}>
                        <label style={S.label}>Add New Paragraph</label>
                        <textarea value={newText} onChange={e => setNewText(e.target.value)}
                            placeholder="Type a new paragraph…" rows={3}
                            style={{ ...S.input, resize: 'vertical' }} />
                        <button style={S.btnBrown} onClick={add}>+ Add Paragraph</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── CATEGORIES TAB ──────────────────────────
function CategoriesTab() {
    const [categories, setCategories] = useState<any[]>([]);
    const [newName, setNewName] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    const load = () => api.getCategories().then(r => setCategories(r.data));
    useEffect(() => { load(); }, []);

    const add = async () => {
        if (!newName.trim()) return;
        try { await api.createCategory({ name: newName }); setNewName(''); load(); setToast({ msg: 'Category added!', type: 'success' }); }
        catch { setToast({ msg: 'Failed to add.', type: 'error' }); }
    };

    const save = async (id: number) => {
        try { await api.updateCategory(id, { name: editName }); setEditId(null); load(); setToast({ msg: 'Updated!', type: 'success' }); }
        catch { setToast({ msg: 'Failed.', type: 'error' }); }
    };

    const del = async (id: number) => {
        if (!confirm('Delete this category?')) return;
        try { await api.deleteCategory(id); load(); setToast({ msg: 'Deleted.', type: 'success' }); }
        catch { setToast({ msg: 'Failed.', type: 'error' }); }
    };

    return (
        <div>
            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
            <div style={S.card}>
                <div style={S.cardHeader}>
                    <h3 style={{ ...S.cardTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Tags size={18} /> Product Categories
                    </h3>
                    <span style={S.badge(true)}>{categories.length} categories</span>
                </div>
                <div style={S.cardBody}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                        {categories.map(c => (
                            <div key={c.id} style={{ border: `1.5px solid ${C.grey200}`, borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.brown50 }}>
                                {editId === c.id ? (
                                    <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'center' }}>
                                        <input style={{ ...S.input, marginBottom: 0, flex: 1 }} value={editName} onChange={e => setEditName(e.target.value)} />
                                        <button style={{ ...S.btnBrown, padding: '6px 12px' }} onClick={() => save(c.id)}>✓</button>
                                        <button style={{ ...S.btnRed, padding: '6px 12px' }} onClick={() => setEditId(null)}>✕</button>
                                    </div>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '13.5px', fontWeight: 500, color: C.brown700 }}>{c.name}</span>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button style={{ ...S.btnOutline, padding: '4px 10px', fontSize: '12px' }} onClick={() => { setEditId(c.id); setEditName(c.name); }}>Edit</button>
                                            <button style={{ ...S.btnRed, padding: '4px 10px', fontSize: '12px' }} onClick={() => del(c.id)}>Del</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: `1px solid ${C.grey200}`, paddingTop: '16px' }}>
                        <label style={S.label}>Add New Category</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input style={{ ...S.input, marginBottom: 0, flex: 1 }} value={newName}
                                onChange={e => setNewName(e.target.value)} placeholder="e.g. Smart Home Hardware"
                                onKeyDown={e => e.key === 'Enter' && add()} />
                            <button style={S.btnBrown} onClick={add}>+ Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── PRODUCTS TAB ────────────────────────────
function ProductsTab() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [formProduct, setFormProduct] = useState({ title: '', description: '', category: '' });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    const load = () => {
        api.getProducts().then(r => setProducts(r.data));
        api.getCategories().then(r => setCategories(r.data));
    };
    useEffect(() => { load(); }, []);

    const openCreate = () => {
        setEditId(null);
        setFormProduct({ title: '', description: '', category: '' });
        setImageFile(null);
        setShowForm(true);
    };

    const openEdit = (p: any) => {
        setEditId(p.id);
        setFormProduct({ title: p.title, description: p.description || '', category: p.category });
        setImageFile(null);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const save = async () => {
        const fd = new FormData();
        fd.append('title', formProduct.title);
        fd.append('description', formProduct.description);
        fd.append('category', formProduct.category);
        if (imageFile) fd.append('image', imageFile);

        try {
            if (editId) {
                await api.updateProduct(editId, fd);
                setToast({ msg: 'Product updated!', type: 'success' });
            } else {
                await api.createProduct(fd);
                setToast({ msg: 'Product added!', type: 'success' });
            }
            setShowForm(false);
            load();
        } catch {
            setToast({ msg: 'Failed to save product.', type: 'error' });
        }
    };

    const del = async (id: number) => {
        if (!confirm('Delete this product?')) return;
        try { await api.deleteProduct(id); load(); setToast({ msg: 'Deleted.', type: 'success' }); }
        catch { setToast({ msg: 'Failed.', type: 'error' }); }
    };

    return (
        <div>
            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
            <div style={S.card}>
                <div style={S.cardHeader}>
                    <h3 style={{ ...S.cardTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Package size={18} /> Products
                    </h3>
                    <button style={S.btnBrown} onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : '+ Add Product'}
                    </button>
                </div>
                <div style={S.cardBody}>
                    {showForm && (
                        <div style={{ border: `1.5px solid ${C.brown200}`, borderRadius: '12px', padding: '20px', marginBottom: '20px', background: C.brown50 }}>
                            <h4 style={{ margin: '0 0 16px', color: C.brown700, fontSize: '14px', fontWeight: 600 }}>
                                {editId ? 'Edit Product' : 'New Product'}
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                                <div>
                                    <label style={S.label}>Title</label>
                                    <input style={S.input} value={formProduct.title} onChange={e => setFormProduct({ ...formProduct, title: e.target.value })} placeholder="Product title" />
                                </div>
                                <div>
                                    <label style={S.label}>Category</label>
                                    <select style={{ ...S.input, background: C.brown50 }} value={formProduct.category} onChange={e => setFormProduct({ ...formProduct, category: e.target.value })}>
                                        <option value="">Select category…</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={S.label}>Description</label>
                                    <textarea rows={2} style={{ ...S.input, resize: 'vertical' }} value={formProduct.description} onChange={e => setFormProduct({ ...formProduct, description: e.target.value })} placeholder="Short description…" />
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={S.label}>{editId ? 'New Image (leave blank to keep current)' : 'Product Image'}</label>
                                    <input type="file" accept="image/*" style={{ ...S.input, padding: '6px' }} onChange={e => setImageFile(e.target.files?.[0] || null)} />
                                </div>
                            </div>
                            <button style={S.btnBrown} onClick={save}>
                                {editId ? 'Save Changes' : 'Save Product'}
                            </button>
                        </div>
                    )}

                    {products.length === 0 && <p style={{ color: C.grey500, textAlign: 'center', padding: '20px' }}>No products yet. Add one!</p>}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
                        {products.map(p => (
                            <div key={p.id} style={{ border: `1.5px solid ${C.grey200}`, borderRadius: '12px', overflow: 'hidden', background: C.white, boxShadow: '0 1px 4px rgba(60,25,10,.06)' }}>
                                {p.image
                                    ? <img src={p.image} alt={p.title} style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                                    : <div style={{ width: '100%', height: '130px', background: `linear-gradient(135deg, ${C.brown100}, ${C.brown200})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.brown600 }}><Package size={40} /></div>
                                }
                                <div style={{ padding: '12px 14px' }}>
                                    <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '13px', color: C.grey900 }}>{p.title}</p>
                                    {p.description && <p style={{ margin: '0 0 10px', fontSize: '12px', color: C.grey500, lineHeight: 1.5 }}>{p.description}</p>}
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ ...S.btnOutline, padding: '5px 12px', fontSize: '12px', flex: 1 }} onClick={() => openEdit(p)}>Edit</button>
                                        <button style={{ ...S.btnRed, padding: '5px 12px', fontSize: '12px', flex: 1 }} onClick={() => del(p.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── MAIN DASHBOARD ──────────────────────────
const tabs = [
    { id: 'company', label: 'Company Info', Icon: Building },
    { id: 'about', label: 'About Us', Icon: FileText },
    { id: 'categories', label: 'Categories', Icon: Tags },
    { id: 'products', label: 'Products', Icon: Package },
];

export default function CmsDashboard({ onLogout }: { onLogout: () => void }) {
    const [activeTab, setActiveTab] = useState('company');
    const active = tabs.find(t => t.id === activeTab)!;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: C.grey50 }}>

            {/* ── Sidebar ── */}
            <aside style={{
                width: '240px', flexShrink: 0,
                background: C.white,
                borderRight: `1px solid ${C.grey200}`,
                display: 'flex', flexDirection: 'column',
                position: 'fixed', top: 0, bottom: 0, left: 0,
                zIndex: 100,
            }}>
                {/* Brand */}
                <div style={{ padding: '20px 18px 16px', borderBottom: `1px solid ${C.grey200}`, textAlign: 'center' }}>
                    <img
                        src="/smt-site/smt-logo.png"
                        alt="SMT Logo"
                        style={{ width: '72px', height: 'auto', objectFit: 'contain', marginBottom: '10px', display: 'block', margin: '0 auto 10px auto' }}
                    />
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '13.5px', color: C.brown800 }}>SMT Portal</p>
                    <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: C.brown400, fontWeight: 500 }}>Content Management</p>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '14px 10px' }}>
                    <p style={{ margin: '0 0 8px 10px', fontSize: '10px', fontWeight: 700, color: C.grey500, textTransform: 'uppercase', letterSpacing: '0.9px' }}>Menu</p>
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                display: 'flex', width: '100%', textAlign: 'left', alignItems: 'center', gap: '10px',
                                padding: '9px 12px',
                                borderRadius: '8px', border: 'none',
                                fontSize: '13px', fontWeight: isActive ? 600 : 400,
                                color: isActive ? C.brown700 : C.grey700,
                                background: isActive ? C.brown100 : 'transparent',
                                cursor: 'pointer', fontFamily: 'inherit',
                                marginBottom: '2px',
                                borderLeft: isActive ? `3px solid ${C.brown400}` : '3px solid transparent',
                                transition: 'all .15s',
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center' }}><tab.Icon size={16} /></span>
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div style={{ padding: '12px 10px', borderTop: `1px solid ${C.grey200}` }}>
                    <button onClick={onLogout} style={{
                        width: '100%', padding: '9px 12px', borderRadius: '8px',
                        border: `1.5px solid ${C.grey200}`, background: 'transparent',
                        color: C.grey500, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
                        fontWeight: 500, textAlign: 'left', display: 'flex', gap: '8px', alignItems: 'center',
                    }}>
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* ── Main area ── */}
            <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <header style={{
                    background: `linear-gradient(135deg, ${C.brown800} 0%, ${C.brown400} 100%)`,
                    padding: '0 32px',
                    height: '64px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    position: 'sticky', top: 0, zIndex: 99,
                    boxShadow: `0 2px 14px rgba(60,25,10,.35)`,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src="/smt-site/smt-logo.png" alt="SMT" style={{ height: '36px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.92 }} />
                        <div>
                            <h1 style={{ margin: 0, color: C.white, fontSize: '17px', fontWeight: 700 }}>
                                {active.label}
                            </h1>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,.65)', fontSize: '11.5px' }}>
                                Sahab Al Mabelah Trading LLC
                            </p>
                        </div>
                    </div>
                    <a href="/smt-site/" target="_blank" rel="noreferrer" style={{
                        background: 'rgba(255,255,255,.15)', color: C.white,
                        padding: '7px 16px', borderRadius: '20px',
                        fontSize: '12.5px', fontWeight: 600,
                        textDecoration: 'none', border: '1px solid rgba(255,255,255,.25)',
                    }}>
                        🌐 View Site →
                    </a>
                </header>

                {/* Content */}
                <main style={{ flex: 1, padding: '28px 32px' }}>
                    {activeTab === 'company' && <CompanyInfoTab />}
                    {activeTab === 'about' && <AboutTab />}
                    {activeTab === 'categories' && <CategoriesTab />}
                    {activeTab === 'products' && <ProductsTab />}
                </main>

                {/* Footer */}
                <footer style={{
                    background: C.white, borderTop: `1px solid ${C.grey200}`,
                    padding: '12px 32px', textAlign: 'center',
                    fontSize: '12px', color: C.grey500,
                }}>
                    © 2026 Sahab Al Mabelah Trading LLC — SMT Content Management Portal
                </footer>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        button:hover { opacity: 0.88; }
      `}</style>
        </div>
    );
}

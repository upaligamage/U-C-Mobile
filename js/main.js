document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const btn = document.querySelector('button.md\\:hidden'); // Select the hamburger button
    const menu = document.querySelector('div.md\\:hidden.bg-slate-800'); // Select the mobile menu container (simplified selector based on structure)

    // A better way to select if I add IDs, but relying on classes for now based on previous file content
    // Actually, I added IDs in index.html (mobile-menu-btn, mobile-menu), but maybe not throughout.
    // Let's use a generic resilient selector or IDs if present.
    
    // Check for IDs first (Index.html had them)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn') || document.querySelector('button.md\\:hidden');
    const mobileMenu = document.getElementById('mobile-menu'); // This might not be in all files, checking structure.
    
    // In products/repair/contact, I didn't add the ID 'mobile-menu'. I should have. 
    // However, I can select the menu by its unique class combination if ID fails.
    // The menu is usually the div after the nav container or inside it.
    // Let's assume the user might click the button. 
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // If mobileMenu 'id' exists use it, else find the div that is hidden and md:hidden
            let targetMenu = mobileMenu;
            if (!targetMenu) {
                // Look for the sibling or child that represents the menu
                // It's usually the next element or a specific child of nav
                // In my simplified code, it was a div with class "md:hidden" sometimes hidden.
                // Let's trying to find the 2nd div with class 'md:hidden' in the nav?
                // Actually, let's just toggle a class on the body or manage state carefully.
                // Simplest: Find the menu by class 'bg-slate-800' inside nav or body?
                
                // Let's try to find it relative to the button if needed, or just select all hidden menus.
                // In index.html it has ID. In others it might not.
                // Fix: I will implementation a simple toggle that looks for the menu container.
                
                // Search for the mobile menu container in the document
                const candidates = document.querySelectorAll('.md\\:hidden');
                candidates.forEach(c => {
                    if (c.tagName === 'DIV' && (c.classList.contains('bg-slate-800') || c.classList.contains('space-y-1'))) {
                        targetMenu = c;
                    }
                });
            }

            if (targetMenu) {
                targetMenu.classList.toggle('hidden');
            }
        });
    }

    // Product Filtering Logic (for products.html)
    const filterBtns = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.group.product-card'); // My product cards have these classes

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => {
                    b.classList.remove('bg-brand-600', 'text-white');
                    b.classList.add('bg-slate-800', 'text-gray-300');
                });
                // Add active class to clicked
                btn.classList.remove('bg-slate-800', 'text-gray-300');
                btn.classList.add('bg-brand-600', 'text-white');

                const filter = btn.getAttribute('data-filter');

                products.forEach(product => {
                    // For demo purposes, we will randomize or check text content since I didn't add data-attributes to products
                    // In a real app, products would have data-category="phones" etc.
                    // Let's infer category from the small text label inside the card
                    const categoryLabel = product.querySelector('span.text-xs').textContent.toLowerCase();
                    
                    if (filter === 'all') {
                        product.style.display = 'block';
                    } else if (filter === 'phones' && (categoryLabel.includes('apple') || categoryLabel.includes('samsung') || categoryLabel.includes('google'))) {
                        product.style.display = 'block';
                    } else if (filter === 'accessories' && (categoryLabel.includes('accessories') || categoryLabel.includes('audio') || categoryLabel.includes('protection'))) {
                        product.style.display = 'block';
                    } else if (filter === 'parts' && categoryLabel.includes('spares')) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }
});

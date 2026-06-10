#!/usr/bin/env bash
# sage-fix.sh — convert remaining hardcoded black buttons/sections to sage
# Run from the epoch-skin repo root:  bash sage-fix.sh
# Safe to run more than once (idempotent — already-sage values won't match).
set -e

# 1) Solid black buttons  (#111 + #D4AF77)  ->  sage #3E4A3C + gold #C4974A
#    files: contact, cart, success, blog, ContactForm (+ any dead comps that share the string)
grep -rlF 'bg-[#111] text-[#D4AF77]' app components --include="*.tsx" 2>/dev/null | while read -r f; do
  sed -i '' \
    -e 's|bg-\[#111\] text-\[#D4AF77\]|bg-[#3E4A3C] text-[#C4974A]|g' \
    -e 's|hover:bg-\[#D4AF77\] hover:text-\[#111\]|hover:bg-[#C4974A] hover:text-white|g' "$f"
done

# 2) Blog dark-outline button
sed -i '' 's|border border-\[#111\] text-\[#111\]|border border-[#3E4A3C] text-[#3E4A3C]|g' "app/blog/[slug]/page.tsx"

# 3) Solid black buttons  (#1C1C1A + #C9A96E)  ->  sage + gold
#    files: about, book (active step + continue), admin
grep -rlF 'bg-[#1C1C1A] text-[#C9A96E]' app components --include="*.tsx" 2>/dev/null | while read -r f; do
  sed -i '' \
    -e 's|bg-\[#1C1C1A\] text-\[#C9A96E\]|bg-[#3E4A3C] text-[#C4974A]|g' \
    -e 's|hover:bg-\[#C9A96E\] hover:text-\[#1C1C1A\]|hover:bg-[#C4974A] hover:text-white|g' "$f"
done

# 4) About dark-outline buttons
sed -i '' \
  -e 's|border border-\[#1C1C1A\] text-\[#1C1C1A\]|border border-[#3E4A3C] text-[#3E4A3C]|g' \
  -e 's|hover:bg-\[#1C1C1A\] hover:text-\[#C9A96E\]|hover:bg-[#3E4A3C] hover:text-[#C4974A]|g' \
  app/about/page.tsx

# 5) Book selected-time slot border
sed -i '' 's|border-\[#1C1C1A\]|border-[#3E4A3C]|g' app/book/page.tsx

# 6) Full section / hero / sticky-bar backgrounds -> deep sage #2E3A2C (matches footer)
sed -i '' 's|bg-\[#1C1C1A\] py-20 px-5 text-center|bg-[#2E3A2C] py-20 px-5 text-center|' app/about/page.tsx
sed -i '' 's|bg-\[#1C1C1A\] py-20 md:py-28|bg-[#2E3A2C] py-20 md:py-28|'   app/shop/page.tsx
sed -i '' 's|bg-\[#1C1C1A\] border-t border-\[#2E2E2C\]|bg-[#2E3A2C] border-t border-[#3E4A3C]|' app/book/page.tsx

# 7) Shop product image overlays -> translucent deep sage
sed -i '' 's|bg-\[#18181A\]/80|bg-[#2E3A2C]/80|' components/shop/ProductCard.tsx
sed -i '' 's|bg-\[#1C1C1A\]/50|bg-[#2E3A2C]/50|' components/shop/ProductDetail.tsx

echo "Done. Verifying no black remains in live files..."
if grep -rnE "bg-\[#(1C1C1A|18181A|1A1A18|111110|111|000)\]|bg-black|border border-\[#1C1C1A\]" app components --include="*.tsx" \
   | grep -vE "HeroSection|HomeTrust|home/Newsletter\.|ServiceCategoryCards|NewsletterForm\.|ShopGrid|ServicesOverview|booking/" ; then
  echo "^ review the above (any matches in live files)"
else
  echo "CLEAN — no black backgrounds/outlines remain."
fi

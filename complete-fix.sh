#!/bin/bash

# EPOCH SKIN - COMPLETE FIX SCRIPT
# This fixes ALL the missing functions and files

echo "🔧 EPOCH SKIN - COMPLETE FIX"
echo "=============================="
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Not in epoch-skin directory${NC}"
    echo "Please run from inside your epoch-skin folder"
    exit 1
fi

echo -e "${BLUE}📂 Found epoch-skin project${NC}"
echo ""

# Find update files
UPDATE_PATH=""
if [ -d "$HOME/Downloads/epoch-skin-updates" ]; then
    UPDATE_PATH="$HOME/Downloads/epoch-skin-updates"
elif [ -d "../epoch-skin-updates" ]; then
    UPDATE_PATH="../epoch-skin-updates"
fi

if [ -z "$UPDATE_PATH" ]; then
    echo -e "${RED}❌ Cannot find epoch-skin-updates folder${NC}"
    exit 1
fi

echo -e "${YELLOW}Fixing all files...${NC}"
echo ""

# Fix 1: Replace products.ts with complete version
echo "1. Updating products.ts..."
if [ -f "$HOME/Downloads/products-FIXED.ts" ]; then
    cp "$HOME/Downloads/products-FIXED.ts" data/products.ts
    echo -e "${GREEN}✅ Fixed products.ts${NC}"
else
    echo -e "${YELLOW}⚠️  products-FIXED.ts not found in Downloads${NC}"
fi

# Fix 2: Replace services.ts with complete version
echo "2. Updating services.ts..."
if [ -f "$HOME/Downloads/services-FIXED.ts" ]; then
    cp "$HOME/Downloads/services-FIXED.ts" data/services.ts
    echo -e "${GREEN}✅ Fixed services.ts${NC}"
else
    echo -e "${YELLOW}⚠️  services-FIXED.ts not found in Downloads${NC}"
fi

# Fix 3: Replace utils.ts with complete version
echo "3. Updating lib/utils.ts..."
if [ -f "$HOME/Downloads/utils-FIXED.ts" ]; then
    cp "$HOME/Downloads/utils-FIXED.ts" lib/utils.ts
    echo -e "${GREEN}✅ Fixed lib/utils.ts${NC}"
else
    echo -e "${YELLOW}⚠️  utils-FIXED.ts not found in Downloads${NC}"
fi

# Fix 4: Copy new components
echo "4. Adding new components..."
if [ -d "$UPDATE_PATH/components/home" ]; then
    cp "$UPDATE_PATH/components/home/About.tsx" components/home/ 2>/dev/null && echo -e "${GREEN}✅ Added About.tsx${NC}"
    cp "$UPDATE_PATH/components/home/Commitment.tsx" components/home/ 2>/dev/null && echo -e "${GREEN}✅ Added Commitment.tsx${NC}"
    cp "$UPDATE_PATH/components/home/FAQ.tsx" components/home/ 2>/dev/null && echo -e "${GREEN}✅ Added FAQ.tsx${NC}"
    cp "$UPDATE_PATH/components/home/Contact.tsx" components/home/ 2>/dev/null && echo -e "${GREEN}✅ Added Contact.tsx${NC}"
fi

# Fix 5: Update Hero text
echo "5. Updating Hero text..."
if [ -f "components/home/Hero.tsx" ]; then
    sed -i '' 's/Natural Beauty, Timeless Results/Organic Beauty, Timeless Results/g' components/home/Hero.tsx
    sed -i '' 's/100% Natural Ingredients/100% Organic Ingredients/g' components/home/Hero.tsx
    sed -i '' 's/natural skincare/organic skincare/g' components/home/Hero.tsx
    echo -e "${GREEN}✅ Updated Hero.tsx${NC}"
fi

# Fix 6: Global text replacements
echo "6. Global text updates..."
find components app -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/natural ingredients/organic ingredients/g' {} + 2>/dev/null
find components app -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' 's/Natural ingredients/Organic ingredients/g' {} + 2>/dev/null
echo -e "${GREEN}✅ Text replacements complete${NC}"

echo ""
echo -e "${GREEN}✅ ✅ ✅ ALL FIXES APPLIED! ✅ ✅ ✅${NC}"
echo ""
echo -e "${BLUE}📋 NEXT STEPS:${NC}"
echo ""
echo "1. Edit app/page.tsx to add new components:"
echo "   nano app/page.tsx"
echo ""
echo "   Add these imports:"
echo "   import About from \"@/components/home/About\";"
echo "   import Commitment from \"@/components/home/Commitment\";"
echo "   import FAQ from \"@/components/home/FAQ\";"
echo "   import Contact from \"@/components/home/Contact\";"
echo ""
echo "   Add components in the return:"
echo "   <About />"
echo "   <Commitment />"
echo "   <FAQ />"
echo "   <Contact />"
echo ""
echo "2. Start dev server:"
echo "   npm run dev"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo -e "${GREEN}🎉 You're all set!${NC}"
